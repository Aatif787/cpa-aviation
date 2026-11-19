# cpaleasing.com — VPS Deployment Guide (Static site + Nginx)

| चीज़ | वैल्यू |
| --- | --- |
| Canonical URL | `https://www.cpaleasing.com` (non-www → www redirect) |
| App folder | `/app/cpa-aviation` |
| Nginx किस फोल्डर से serve करता है | `/app/cpa-aviation/site` (static HTML/JS/CSS) |
| Node server / PM2 | **नहीं चाहिए।** साइट पूरी तरह static है |
| Contact form | Browser से सीधे `https://clp.cpaleasing.com/api/v1/leads` पर जाता है |
| Nginx फाइल | `/etc/nginx/sites-available/cpaleasing.com` |

**Build कैसे बनती है:** `npm run build` चलाने पर `vite build` होता है, फिर `scripts/prerender.mjs` चलता है। Prerender स्टेप हर page को static HTML में बदल देता है, और साथ में `sitemap.xml`, `robots.txt` (Sitemap लाइन के साथ) और `404.html` भी बनाता है। ये सब `.output/public` में जाते हैं। Build पूरी होने के बाद `deploy.sh` इन्हें `site/` में copy करके swap कर देता है, इसलिए build के दौरान भी साइट बंद नहीं होती। अगर build fail हो जाए, तो live साइट जैसी है वैसी ही रहती है।

जो काम पहले Node server करता था, वो अब Nginx करता है:
- HTTP से HTTPS redirect
- `/index.html`, `/index` और `/home` को `/` पर redirect
- आखिर वाला `/` हटाकर redirect
- Security headers
- 404 page

इस फोल्डर की फाइलें:
- `nginx/cpaleasing.com.http-only.conf`: पहला SSL certificate लेने के लिए temporary config
- `nginx/cpaleasing.com.conf`: फाइनल HTTPS config, जो static files serve करता है
- `deploy.sh`: git pull, `npm ci` और build करता है, फिर `site/` में publish करता है। Nginx और SSL को नहीं छूता।

> Root में पड़ी पुरानी `ecosystem.config.cjs` और `nginx.conf.example` **इस्तेमाल न करें**।

सारे commands `root` से चलाने हैं।

---

## Contact form (Leads API)

Contact form browser से सीधे `https://clp.cpaleasing.com/api/v1/leads` पर enquiry भेजता है। भेजा जाने वाला payload:

```json
{ "type": "quote", "name": "...", "email": "...", "phone": "", "message": "Subject: ...\nCompany: ...\n\n...", "website": "" }
```

- Form में phone field नहीं है, इसलिए `phone` खाली जाता है।
- Subject और Company `message` की शुरुआत में जुड़ जाते हैं।
- `website` एक honeypot field है, यानी spam bots को पकड़ने के लिए छिपा हुआ field।

Site key सिर्फ `www.cpaleasing.com` और `cpaleasing.com` से आई requests पर काम करती है, इसलिए browser bundle में इसका होना ठीक है। Key **git में नहीं** रखी जाती। VPS पर इसे `/app/cpa-aviation/.env.production` फाइल में डालें:

```bash
cat > /app/cpa-aviation/.env.production <<'EOF'
VITE_LEADS_API_URL=https://clp.cpaleasing.com/api/v1/leads
VITE_LEADS_SITE_KEY=<यहाँ site key>
EOF
```

Vite यह फाइल build के समय पढ़ता है, इसलिए key बदलने पर `deploy.sh` दोबारा चलाना होगा। अगर key सेट नहीं है, तो form पहले की तरह email draft (mailto) खोल देगा।

---

## A. पुराने PM2 setup से migrate करना (एक बार)

**1. PM2 वाला process हटाएं** (अगर "not found" आए तो ignore करें)

```bash
pm2 delete cpa-aviation; pm2 save
```

**2. Code pull करें, build करें और publish करें**

```bash
bash /app/cpa-aviation/deploy/deploy.sh
```

आखिर में `OK — static site published (8 pages)` दिखना चाहिए।

**3. नया Nginx config लगाएं**

```bash
cp /app/cpa-aviation/deploy/nginx/cpaleasing.com.conf /etc/nginx/sites-available/cpaleasing.com && nginx -t && systemctl reload nginx
```

**4. Test करें**

```bash
curl -sI https://www.cpaleasing.com/contact | head -1
```

इसमें `HTTP/2 200` आना चाहिए।

> अगर Nginx `403 Forbidden` दे, तो इसका मतलब है `www-data` user `/app` फोल्डर नहीं पढ़ पा रहा। यह चलाएं:
> ```bash
> chmod o+rx /app /app/cpa-aviation
> ```

---

## B. नए सर्वर पर पहली बार setup

सर्वर पर पहले से Node 20+, git, Nginx और certbot होने चाहिए।

1. Code लाएं:
```bash
git clone https://github.com/CPA-aviation/cpa-aviation.git /app/cpa-aviation
```
2. ऊपर बताई गई `.env.production` फाइल बनाएं।
3. Build करके publish करें:
```bash
bash /app/cpa-aviation/deploy/deploy.sh
```
4. HTTP-only config लगाएं:
```bash
mkdir -p /var/www/letsencrypt && cp /app/cpa-aviation/deploy/nginx/cpaleasing.com.http-only.conf /etc/nginx/sites-available/cpaleasing.com && ln -sf /etc/nginx/sites-available/cpaleasing.com /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx
```
5. SSL certificate लें:
```bash
certbot certonly --webroot -w /var/www/letsencrypt -d cpaleasing.com -d www.cpaleasing.com --deploy-hook "systemctl reload nginx"
```
6. फाइनल config लगाने के लिए section A का step 3 चलाएं।

---

## आगे के अपडेट

```bash
bash /app/cpa-aviation/deploy/deploy.sh
```

Nginx reload करने की ज़रूरत नहीं है, क्योंकि नई files `site/` में आते ही serve होने लगती हैं।

> Build के दौरान prerender स्टेप थोड़ी देर के लिए पोर्ट `4399` पर एक internal server चलाता है। यह पोर्ट किसी और काम के लिए न दें।

Error log देखने के लिए:

```bash
tail -f /var/log/nginx/cpaleasing.com.error.log
```
