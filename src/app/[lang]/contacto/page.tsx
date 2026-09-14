import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getDictionary } from "@/i18n";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { Container, Section } from "@/components/ui/Container";
import { social } from "@/lib/utils";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  void lang;

  return (
    <>
      <PageHero title={dict.contact.title} lead={dict.contact.lead} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-fg">{dict.contact.offices}</h2>
            <ul className="mt-8 space-y-5 text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 text-accent" size={18} />
                <span>
                  {dict.contact.city}
                  <br />
                  {social.address}
                </span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 text-accent" size={18} />
                <a href={social.whatsappLink} className="hover:text-accent">
                  {dict.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 text-accent" size={18} />
                <a href={`mailto:${social.emailAlt}`} className="hover:text-accent">
                  {dict.contact.email}
                </a>
              </li>
            </ul>
            <Image
              src="/images/pages/equipo-contacto.jpg"
              alt=""
              width={720}
              height={480}
              className="mt-10 w-full rounded-[25px] object-cover"
            />
          </div>
          <div className="rounded-[25px] border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-fg">{dict.contact.formTitle}</h2>
            <p className="mt-2 mb-6 text-sm text-muted">{dict.contact.formLead}</p>
            <ContactForm dict={dict} />
          </div>
        </Container>
      </Section>
    </>
  );
}
