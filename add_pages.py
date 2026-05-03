#!/usr/bin/env python3
"""
Generate /privacy-policy/ and /terms-and-conditions/ pages by reusing the
existing site's chrome (header, footer, fonts, base styles) from about-us/
as a template, then inject footer links to both pages on every page of the
site.

Idempotent: safe to re-run.
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "about-us" / "index.html"

# -- Page metadata ---------------------------------------------------------

PRIVACY_DESCRIPTION = (
    "Trailside Handyman privacy policy: what information we collect, how we "
    "use it, our SMS text messaging program, data sharing, retention, and "
    "your rights. A service of Morod Corporation in Thornton, CO."
)

TERMS_DESCRIPTION = (
    "Trailside Handyman terms and conditions covering services, estimates, "
    "payment, our SMS text messaging program, warranty, liability, and "
    "governing law. A service of Morod Corporation in Thornton, CO."
)


# -- Page bodies (rendered into the site chrome) ---------------------------

PRIVACY_BODY = """
<h2>1. Introduction</h2>
<p>Morod Corporation, doing business as Trailside Handyman ("Trailside Handyman," "we," "us," or "our"), respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices you have regarding your information.</p>
<p>This policy applies to information collected through our website at trailsidehandyman.com, our SMS text messaging program, phone calls, written estimates, and any other interaction you have with Trailside Handyman.</p>

<h2>2. Information We Collect</h2>
<p>We collect the following categories of information:</p>

<h3>Information you provide directly to us</h3>
<ul>
  <li>Name (first and last)</li>
  <li>Phone number (mobile and/or landline)</li>
  <li>Email address</li>
  <li>Service address and billing address</li>
  <li>Description of the work you are requesting</li>
  <li>Photos or videos you send us related to a job</li>
  <li>Payment information (processed through a third-party payment processor; we do not store full card numbers)</li>
  <li>Signed estimates, work authorizations, and consent forms</li>
</ul>

<h3>Information collected automatically when you visit our website</h3>
<ul>
  <li>IP address</li>
  <li>Browser type and version</li>
  <li>Pages visited and time spent on each page</li>
  <li>Referring website</li>
  <li>Device type</li>
</ul>

<h3>Information collected through SMS</h3>
<ul>
  <li>Your mobile phone number</li>
  <li>The content of messages you send to us</li>
  <li>Date and time of messages</li>
  <li>Carrier information (provided by your wireless carrier to deliver messages)</li>
</ul>

<h2>3. How We Use Your Information</h2>
<p>We use the information we collect for the following purposes:</p>
<ul>
  <li>To schedule, confirm, and complete the handyman services you request</li>
  <li>To communicate with you about appointments, estimates, invoices, and job status</li>
  <li>To send transactional SMS messages including appointment confirmations, technician ETAs, invoice and payment links, and replies to your questions</li>
  <li>To process payments for services rendered</li>
  <li>To respond to inquiries and provide customer support</li>
  <li>To maintain records required for tax, accounting, and warranty purposes</li>
  <li>To improve our services and website</li>
  <li>To comply with applicable laws and regulations</li>
</ul>

<h2>4. SMS Text Messaging Program</h2>
<p>When you provide your mobile phone number and consent to receive text messages from Trailside Handyman, the information collected as part of the SMS program (including your mobile phone number, opt-in date, and message content) <strong>will not be shared with third parties or affiliates for their marketing or promotional purposes</strong>. SMS opt-in data and consent records are used only to deliver the messages you have consented to receive and to comply with telecommunications regulations.</p>
<p>You can opt out at any time by replying <strong>STOP</strong> to any message. <strong>Message and data rates may apply.</strong> <strong>Message frequency varies.</strong> Reply <strong>HELP</strong> for assistance.</p>

<h2>5. How We Share Your Information</h2>
<p>We do not sell, rent, or trade your personal information. We share your information only in the following limited circumstances:</p>
<ul>
  <li><strong>Service providers:</strong> We share information with trusted third-party vendors who help us operate our business, including our SMS provider (Twilio), payment processor, accounting software, and scheduling tools. These providers are contractually obligated to protect your information and use it only for the services they provide to us.</li>
  <li><strong>Legal compliance:</strong> We may disclose information if required by law, subpoena, court order, or to protect the rights, property, or safety of Trailside Handyman, our customers, or others.</li>
  <li><strong>Business transfers:</strong> If Morod Corporation is involved in a merger, acquisition, or sale of assets, customer information may be transferred as part of that transaction. You will be notified of any such change.</li>
</ul>
<p>We do not share your information with third parties for their own marketing purposes.</p>

<h2>6. Data Retention</h2>
<p>We retain your personal information for as long as necessary to provide the services you requested, comply with legal and tax obligations (typically a minimum of seven years for financial records), resolve disputes, and enforce our agreements. SMS opt-in records are retained for the duration of the program and a reasonable period after opt-out for compliance purposes.</p>

<h2>7. Data Security</h2>
<p>We use reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the internet or electronic storage is one hundred percent secure, and we cannot guarantee absolute security.</p>

<h2>8. Your Rights and Choices</h2>
<p>You have the right to:</p>
<ul>
  <li>Request access to the personal information we hold about you</li>
  <li>Request correction of inaccurate information</li>
  <li>Request deletion of your information, subject to our legal obligations to retain certain records</li>
  <li>Opt out of SMS messages at any time by replying <strong>STOP</strong></li>
  <li>Unsubscribe from any email communications using the unsubscribe link</li>
</ul>
<p>To exercise any of these rights, contact us using the information in Section 11.</p>

<h2>9. Children's Privacy</h2>
<p>Trailside Handyman services are intended for adults aged 18 and older. We do not knowingly collect personal information from children under 13. If we learn that we have collected information from a child under 13, we will delete it.</p>

<h2>10. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this policy will reflect the most recent revision. Material changes will be communicated through our website or, where appropriate, by direct notice.</p>

<h2>11. Contact Us</h2>
<p>If you have questions about this Privacy Policy or our privacy practices, contact us:</p>
<p>
  <strong>Trailside Handyman / Morod Corporation</strong><br>
  Thornton, CO<br>
  Phone: <a href="tel:+17207021869">(720) 702-1869</a><br>
  Email: <a href="mailto:mike@trailsidehandyman.com">mike@trailsidehandyman.com</a><br>
  Website: <a href="https://trailsidehandyman.com">https://trailsidehandyman.com</a>
</p>
"""

TERMS_BODY = """
<h2>1. Agreement to Terms</h2>
<p>These Terms and Conditions ("Terms") govern your use of services provided by Morod Corporation, doing business as Trailside Handyman ("Trailside Handyman," "we," "us," or "our"), and your use of our website at trailsidehandyman.com and our SMS text messaging program. By requesting services, signing an estimate, or opting in to receive text messages, you agree to these Terms.</p>

<h2>2. Services</h2>
<p>Trailside Handyman provides residential and small commercial handyman, repair, installation, and maintenance services in the Denver, Colorado metropolitan area. All work is performed under a written estimate or work authorization signed by the customer. Service availability, pricing, and scheduling are subject to change.</p>

<h2>3. Estimates, Payment, and Cancellation</h2>
<p>Estimates are valid for 30 days unless otherwise stated in writing. Payment is due upon completion of work unless other terms are agreed to in writing. Accepted payment methods are listed on the invoice. Cancellations made less than 24 hours before a scheduled appointment may be subject to a trip fee.</p>

<h2>4. SMS Text Messaging Program</h2>

<h3>4.1 Program Name</h3>
<p>Trailside Handyman Customer Communications</p>

<h3>4.2 Program Description</h3>
<p>Trailside Handyman operates an SMS text messaging program for the purpose of communicating directly with customers about active and prospective service jobs. Messages sent through this program include:</p>
<ul>
  <li>Appointment confirmations and reminders</li>
  <li>Technician arrival times and on-the-way notifications</li>
  <li>Job status updates and scheduling changes</li>
  <li>Estimate delivery and follow-up</li>
  <li>Invoice delivery and payment links</li>
  <li>Replies to customer questions about active or completed work</li>
  <li>General service-related customer support</li>
</ul>
<p>The program is transactional and customer-service oriented. We do not send promotional or marketing messages through this program.</p>

<h3>4.3 How to Opt In</h3>
<p>You may opt in to receive SMS messages from Trailside Handyman by:</p>
<ul>
  <li>Submitting your phone number through the contact or estimate request form on trailsidehandyman.com and checking the SMS consent box</li>
  <li>Signing a written estimate or work authorization that includes the SMS consent disclosure and initialing the SMS opt-in section</li>
  <li>Texting <strong>START</strong>, <strong>SUBSCRIBE</strong>, or <strong>YES</strong> to (720) 702-1869</li>
</ul>
<p>By opting in, you confirm that you are the account holder or authorized user of the mobile phone number provided and that you consent to receive SMS messages from Trailside Handyman at that number.</p>

<h3>4.4 Message and Data Rates</h3>
<p><strong>Message and data rates may apply.</strong> Trailside Handyman does not charge a fee to send or receive SMS messages, but your wireless carrier may charge for messages sent or received depending on your plan. Contact your wireless carrier for details about your messaging plan.</p>

<h3>4.5 Message Frequency</h3>
<p><strong>Message frequency varies</strong> based on the status of your active jobs and your communication with us. A typical customer receives between 2 and 10 messages per active service request. Customers without an active job will generally receive no messages.</p>

<h3>4.6 Support and Help</h3>
<p>For help with the SMS program, reply <strong>HELP</strong> to any message or contact us at <a href="tel:+17207021869">(720) 702-1869</a> or <a href="mailto:mike@trailsidehandyman.com">mike@trailsidehandyman.com</a>. You will receive a reply with contact information and program details.</p>

<h3>4.7 Opt-Out Instructions</h3>
<p>You can opt out of the SMS program at any time. Reply <strong>STOP</strong> to any message you receive from Trailside Handyman. After replying <strong>STOP</strong> you will receive one final confirmation message and no further SMS messages will be sent to your number unless you opt in again. Other accepted opt-out keywords include <strong>STOPALL</strong>, <strong>UNSUBSCRIBE</strong>, <strong>CANCEL</strong>, <strong>END</strong>, and <strong>QUIT</strong>.</p>

<h3>4.8 Carrier Disclaimer</h3>
<p>Wireless carriers are not liable for delayed or undelivered messages. Trailside Handyman is not responsible for messages that are delayed, blocked, or undelivered due to carrier or device issues.</p>

<h3>4.9 Privacy</h3>
<p>Your mobile phone number, SMS opt-in records, and message content are handled in accordance with our <a href="/privacy-policy/">Privacy Policy</a>. SMS opt-in information is not shared with third parties or affiliates for marketing purposes.</p>

<h2>5. Warranty</h2>
<p>Trailside Handyman warrants workmanship for a period of 30 days from completion of work unless a different warranty is specified in writing on the estimate or invoice. Materials are covered by the manufacturer's warranty. This warranty does not cover damage caused by misuse, normal wear, acts of God, or work performed by other parties after our work is completed.</p>

<h2>6. Limitation of Liability</h2>
<p>To the fullest extent permitted by law, Trailside Handyman's total liability for any claim arising out of or related to our services or these Terms is limited to the amount paid by the customer for the specific service giving rise to the claim. Trailside Handyman is not liable for indirect, incidental, consequential, or punitive damages.</p>

<h2>7. Governing Law</h2>
<p>These Terms are governed by the laws of the State of Colorado without regard to conflict of law principles. Any dispute arising from these Terms or our services will be resolved in the state or federal courts located in Adams County, Colorado.</p>

<h2>8. Changes to These Terms</h2>
<p>We may update these Terms from time to time. The "Last Updated" date at the top of this document reflects the most recent revision. Continued use of our services or the SMS program after changes are posted constitutes acceptance of the revised Terms.</p>

<h2>9. Contact Us</h2>
<p>
  <strong>Trailside Handyman / Morod Corporation</strong><br>
  Thornton, CO<br>
  Phone: <a href="tel:+17207021869">(720) 702-1869</a><br>
  Email: <a href="mailto:mike@trailsidehandyman.com">mike@trailsidehandyman.com</a><br>
  Website: <a href="https://trailsidehandyman.com">https://trailsidehandyman.com</a>
</p>
"""


def build_main_section(page_title: str, effective: str, body_html: str) -> str:
    """Build the <div id="main">...</div> replacement that fits the site chrome."""
    container_style = (
        "max-width:920px;margin:60px auto 80px;padding:0 24px;"
        "line-height:1.7;color:#444;"
    )
    h_color_style = "style=\"margin-top:2em;color:#072440;\""
    intro_style = (
        "color:#666;margin-bottom:2.5em;padding-bottom:1em;"
        "border-bottom:1px solid #eaeaea;"
    )
    return f'''<div id="main">
                <div class="wdt-elementor-container-fluid">
                    <div data-elementor-type="wp-page" class="elementor elementor-policy-page">
                        <section class="elementor-section elementor-top-section elementor-section-boxed elementor-section-content-top elementor-section-height-default">
                            <div class="elementor-container elementor-column-gap-default">
                                <div class="elementor-column elementor-col-100 elementor-top-column">
                                    <div class="elementor-widget-wrap elementor-element-populated">
                                        <div class="elementor-widget elementor-widget-text-editor">
                                            <div class="elementor-widget-container" style="{container_style}">
                                                <p style="{intro_style}"><strong>Trailside Handyman</strong> (a service of Morod Corporation)<br><strong>Effective Date:</strong> {effective}<br><strong>Last Updated:</strong> {effective}</p>
                                                {body_html}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>'''


def render_page(slug: str, title: str, description: str, body_html: str, effective: str) -> str:
    """Read template and produce a new page HTML string."""
    src = TEMPLATE.read_text(encoding="utf-8", errors="ignore")

    full_title = f"{title} - Trailside Handyman and Remodeling"

    # 1. <title>
    src = re.sub(
        r"<title>About Us[^<]*</title>",
        f"<title>{full_title}</title>",
        src,
        count=1,
    )

    # 2. meta description (single line, content uses double quotes)
    src = re.sub(
        r'<meta name="description" content="MEET THE OWNER[^"]*">',
        f'<meta name="description" content="{description}">',
        src,
        count=1,
    )

    # 3. canonical
    src = re.sub(
        r'<link rel="canonical" href="/about-us/">',
        f'<link rel="canonical" href="/{slug}/">',
        src,
        count=1,
    )

    # 4. og:title
    src = re.sub(
        r'<meta property="og:title" content="About Us[^"]*">',
        f'<meta property="og:title" content="{full_title}">',
        src,
        count=1,
    )

    # 5. og:description
    src = re.sub(
        r'<meta property="og:description" content="MEET THE OWNER[^"]*">',
        f'<meta property="og:description" content="{description}">',
        src,
        count=1,
    )

    # 6. og:url
    src = re.sub(
        r'<meta property="og:url" content="/about-us/">',
        f'<meta property="og:url" content="/{slug}/">',
        src,
        count=1,
    )

    # 7. twitter:title
    src = re.sub(
        r'<meta name="twitter:title" content="About Us[^"]*">',
        f'<meta name="twitter:title" content="{full_title}">',
        src,
        count=1,
    )

    # 8. twitter:description
    src = re.sub(
        r'<meta name="twitter:description" content="MEET THE OWNER[^"]*">',
        f'<meta name="twitter:description" content="{description}">',
        src,
        count=1,
    )

    # 9. body class — change page-id-317 / elementor-page-317 to a unique id
    body_id = f"page-id-{slug}"
    elem_page = f"elementor-page-{slug}"
    src = src.replace("page-id-317", body_id)
    src = src.replace("elementor-page-317", elem_page)

    # 10. Breadcrumb h1 + current span
    src = src.replace(
        '<div class="main-title-section"><h1>About Us</h1></div>',
        f'<div class="main-title-section"><h1>{title}</h1></div>',
    )
    src = src.replace(
        '<span class="current">About Us</span>',
        f'<span class="current">{title}</span>',
    )

    # 11. Replace the entire main section with the policy content
    new_main = build_main_section(title, effective, body_html)
    src = re.sub(
        r'<div id="main">.*?</div><!-- \*\*Main - End \*\* -->',
        lambda _: new_main + "<!-- **Main - End ** -->",
        src,
        count=1,
        flags=re.DOTALL,
    )

    return src


# -- Footer link injection -------------------------------------------------

FOOTER_LINKS_MARKER = "<!-- policy-links -->"
FOOTER_LINKS_HTML = (
    f'{FOOTER_LINKS_MARKER}'
    '<div style="text-align:center;padding:18px 20px;background:#072440;'
    'border-top:1px solid #1a3550;font-size:13px;color:#878787;">'
    '<a href="/privacy-policy/" style="color:#ffffff;text-decoration:none;'
    'margin:0 12px;">Privacy Policy</a>'
    '<span style="color:#414141;">&middot;</span>'
    '<a href="/terms-and-conditions/" style="color:#ffffff;text-decoration:none;'
    'margin:0 12px;">Terms &amp; Conditions</a>'
    '</div>'
)


def inject_footer_links(html_path: Path) -> bool:
    """Add policy links right before </footer>. Idempotent. Returns True if changed."""
    text = html_path.read_text(encoding="utf-8", errors="ignore")
    if FOOTER_LINKS_MARKER in text:
        return False
    if "</footer>" not in text:
        return False
    new_text = text.replace("</footer>", FOOTER_LINKS_HTML + "</footer>", 1)
    html_path.write_text(new_text, encoding="utf-8")
    return True


# -- Main ------------------------------------------------------------------

def main():
    effective = "May 2, 2026"

    pages = [
        ("privacy-policy", "Privacy Policy", PRIVACY_DESCRIPTION, PRIVACY_BODY),
        ("terms-and-conditions", "Terms and Conditions", TERMS_DESCRIPTION, TERMS_BODY),
    ]

    for slug, title, desc, body in pages:
        out_dir = ROOT / slug
        out_dir.mkdir(exist_ok=True)
        out_file = out_dir / "index.html"
        html = render_page(slug, title, desc, body, effective)
        out_file.write_text(html, encoding="utf-8")
        print(f"Wrote {out_file}")

    # Inject footer links into every index.html that has a <footer>
    changed = 0
    for path in ROOT.rglob("index.html"):
        if inject_footer_links(path):
            changed += 1
            print(f"Added footer links to {path.relative_to(ROOT)}")
    print(f"Footer links added to {changed} files (already-injected files skipped).")


if __name__ == "__main__":
    main()
