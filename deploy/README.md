# cpaleasing.com — VPS Deployment Guide (Nginx + PM2)

| चीज़ | वैल्यू |
| --- | --- |
| Canonical URL | `https://www.cpaleasing.com` (non-www → www redirect) |
| App folder | `/app/cpa-aviation` |
| App पोर्ट | `127.0.0.1:3003` (सिर्फ localhost पर, बाहर से सीधे नहीं खुलेगा) |
| PM2 नाम | `cpa-aviation` |
| Nginx फाइल | `/etc/nginx/sites-available/cpaleasing.com` |
| Stack | TanStack Start + Vite + Nitro (`node-server` preset), चलती है `node .output/server/index.mjs` से |

इस फोल्डर की फाइलें:
- `nginx/cpaleasing.com.http-only.conf`: पहला SSL certificate लेने के लिए temporary config
- `nginx/cpaleasing.com.conf`: फाइनल HTTPS config
- `ecosystem.config.cjs`: PM2 प्रोसेस (पोर्ट 3003)
- `deploy.sh`: यह git pull, `npm ci`, build (prerender सहित) और PM2 reload करता है। Nginx और SSL को नहीं छूता।

> Root में पड़ी पुरानी `ecosystem.config.cjs` (पोर्ट 3000) और `nginx.conf.example` (cpaaviation.in) **इस्तेमाल न करें**। VPS पर `deploy/` वाली फाइलें ही चलेंगी।

सर्वर की तैयारी (Node, PM2, Nginx, certbot, firewall, `/var/www/letsencrypt`) cpacontractingllc.com के समय हो चुकी है, इसलिए यहाँ दोबारा नहीं करनी। सारे commands `root` से चलाने हैं।

---

## Contact form (Leads API)

Contact form browser से सीधे `https://clp.cpaleasing.com/api/v1/leads` पर enquiry भेजता है। भेजा जाने वाला payload:

```json
{ "type": "quote", "name": "...", "email": "...", "phone": "", "message": "Subject: ...\nCompany: ...\n\n...", "website": "" }
```

- Form में phone field नहीं है, इसलिए `phone` खाली जाता है।
- Subject और Company `message` की शुरुआत में जुड़ जाते हैं।
- `website` एक honeypot field है, यानी spam bots को पकड़ने के लिए छिपा हुआ field।

Site key सिर्फ `www.cpaleasing.com` और `cpaleasing.com` से भेजी गई requests पर काम करती है, इसलिए browser bundle में इसका होना ठीक है। Key **git में नहीं** रखी जाती। VPS पर इसे `/app/cpa-aviation/.env.production` में डालें:

```bash
cat > /app/cpa-aviation/.env.production <<'EOF'
VITE_LEADS_API_URL=https://clp.cpaleasing.com/api/v1/leads
VITE_LEADS_SITE_KEY=<यहाँ site key>
EOF
```

Vite यह फाइल build के समय पढ़ता है। Key बदलने पर `deploy.sh` दोबारा चलाना होगा। अगर key सेट नहीं है, तो form पहले की तरह email draft (mailto) खोल देगा।

---

## 1. Code लाएं और साइट चालू करें

```bash
git clone https://github.com/CPA-aviation/cpa-aviation.git /app/cpa-aviation
```

फिर ऊपर बताई गई `.env.production` फाइल बनाएं। उसके बाद:

```bash
bash /app/cpa-aviation/deploy/deploy.sh
```

Script के आखिर में `OK — site is responding` दिखना चाहिए। फिर PM2 की list सेव करें, ताकि reboot के बाद भी app चालू रहे:

```bash
pm2 save
```

> Build के दौरान prerender स्टेप थोड़ी देर के लिए पोर्ट `4399` पर एक internal server चलाता है। ध्यान रखें कि यह पोर्ट किसी और साइट को न दिया जाए।

---

## 2. Nginx: पहले HTTP-only config (certificate लेने के लिए)

```bash
cp /app/cpa-aviation/deploy/nginx/cpaleasing.com.http-only.conf /etc/nginx/sites-available/cpaleasing.com && ln -sf /etc/nginx/sites-available/cpaleasing.com /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx
```

## 3. DNS चेक करें

```bash
dig +short cpaleasing.com; dig +short www.cpaleasing.com
```

दोनों में VPS का IP दिखना चाहिए।

## 4. SSL certificate

```bash
certbot certonly --webroot -w /var/www/letsencrypt -d cpaleasing.com -d www.cpaleasing.com --deploy-hook "systemctl reload nginx"
```

## 5. फाइनल HTTPS config

```bash
cp /app/cpa-aviation/deploy/nginx/cpaleasing.com.conf /etc/nginx/sites-available/cpaleasing.com && nginx -t && systemctl reload nginx
```

## 6. Test

```bash
curl -sI https://www.cpaleasing.com | head -1; curl -sI https://cpaleasing.com | grep -i location
```

पहली command से `HTTP/2 200` आना चाहिए, और दूसरी से `location: https://www.cpaleasing.com/`।

---

## आगे के अपडेट

```bash
bash /app/cpa-aviation/deploy/deploy.sh
```

काम की कमांड्स:

```bash
pm2 logs cpa-aviation --lines 100
```

```bash
tail -f /var/log/nginx/cpaleasing.com.error.log
```

---

## पोर्ट रजिस्टर

| पोर्ट | डोमेन | PM2 नाम |
| --- | --- | --- |
| 3001 | www.cpacontractingllc.com | cpa-contracting |
| 3003 | www.cpaleasing.com | cpa-aviation |
| 4399 | — (build-time prerender, cpa-aviation) | — |
