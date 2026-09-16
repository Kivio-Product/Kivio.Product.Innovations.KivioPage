import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp } from "@/components/motion/motion";
import { ContactForm } from "@/components/shared/ContactForm";
import { Container, Section } from "@/components/ui/Container";
import { social } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.contact.title,
    description: d.contact.lead,
    path: "contacto",
  }));
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero lang={lang} path="contacto" title={dict.contact.title} lead={dict.contact.lead} leadScroll />
      <Section className="pt-4">
        <Container className="grid gap-10 lg:grid-cols-2">
          <FadeUp>
            <h2 className="font-display text-3xl text-fg">{dict.contact.offices}</h2>
            <ul className="mt-8 space-y-5 text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-accent" size={18} aria-hidden />
                <span>
                  {dict.contact.city}
                  <br />
                  {social.address}
                </span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 shrink-0 text-accent" size={18} aria-hidden />
                <a href={social.whatsappLink} className="transition hover:text-accent">
                  {dict.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-accent" size={18} aria-hidden />
                <a href={`mailto:${social.emailAlt}`} className="transition hover:text-accent">
                  {dict.contact.email}
                </a>
              </li>
            </ul>
            <div className="relative mt-10 overflow-hidden rounded-[25px] grain">
              <Image
                src="/images/pages/equipo-contacto.jpg"
                alt=""
                width={720}
                height={480}
                className="w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
              <div className="glass absolute bottom-4 left-4 rounded-2xl px-4 py-2.5 text-xs font-medium text-fg">
                {dict.footer.tagline}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="glass rounded-[25px] p-6 shadow-(--card-shadow) sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-xl font-semibold text-fg">{dict.contact.formTitle}</h2>
              <p className="mt-2 mb-6 text-sm text-muted">{dict.contact.formLead}</p>
              <ContactForm dict={dict} />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
