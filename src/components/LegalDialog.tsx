import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type LegalDialogProps = {
  legal: "privacy" | "terms";
  onClose: () => void;
};

export function LegalDialog({ legal, onClose }: LegalDialogProps) {
  return (
    <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogTitle>{legal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}</DialogTitle>
        <DialogDescription className="leading-7">
          {legal === "privacy"
            ? "Our formal Privacy Policy document is not yet published on this website. Information submitted through the enquiry form is used solely to review and respond to corporate aviation leasing correspondence. For privacy enquiries, email "
            : "Our formal website Terms & Conditions are not yet published on this website. Nothing on this site constitutes an offer, financial solicitation, or legal representation beyond stated statutory filings. For legal enquiries, email "}
          <a className="text-primary underline-offset-4 hover:underline" href="mailto:cpaaviationleasing@gmail.com">cpaaviationleasing@gmail.com</a>.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

