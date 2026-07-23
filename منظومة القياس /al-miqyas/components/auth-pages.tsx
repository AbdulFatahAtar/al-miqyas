"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

function AuthFrame({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
  return (
    <main className="auth-page">
      <section className="auth-story">
        <div className="auth-brand"><div className="logo-pending">شعار</div><span><strong>منظومة المقياس</strong><small>شركة الأمد التقنية</small></span></div>
        <div className="auth-statement"><span>قياس · وضوح · ثقة</span><h1>كل نتيجة لها مصدر، وكل شهادة لها دليل.</h1><p>منصة تشغيلية تجمع القياس القبلي والأداء اللحظي والقياس البعدي تحت معرّف واحد.</p></div>
        <div className="auth-pipeline" aria-hidden="true"><i className="done" /><i className="done" /><i className="active" /><i /><i /></div>
      </section>
      <section className="auth-panel">
        <div className="auth-panel-inner"><div className="auth-mobile-brand"><div className="logo-pending">شعار</div><strong>منظومة المقياس</strong></div><header><span className="eyebrow">دخول آمن عبر البريد</span><h2>{title}</h2><p>{description}</p></header>{children}<footer><Link href="/verify/VER-AMD-7K9FQ">التحقق من شهادة</Link><span>·</span><Link href="/t/AMD-7K9FQ">صفحة المتدرّب</Link></footer></div>
      </section>
    </main>
  );
}

export function LoginPage() {
  const [step, setStep] = useState<"email" | "code" | "done">("email");
  const [email, setEmail] = useState("farhad@example.com");
  const submitEmail = (event: FormEvent) => { event.preventDefault(); setStep("code"); };
  const submitCode = (event: FormEvent) => { event.preventDefault(); setStep("done"); };
  return (
    <AuthFrame title="تسجيل الدخول" description="سنرسل رمزاً صالحاً لمرة واحدة إلى بريدك. لا تحتاج إلى كلمة مرور.">
      {step === "email" && <form className="auth-form" onSubmit={submitEmail}><label>البريد الإلكتروني<div className="input-with-icon"><Icon name="mail" size={18} /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" dir="ltr" /></div></label><button className="button button-primary button-wide" type="submit">إرسال رمز الدخول <Icon name="arrow" size={17} /></button><p className="auth-alternative">ليس لديك حساب؟ <Link href="/register">طلب الانضمام</Link></p></form>}
      {step === "code" && <form className="auth-form" onSubmit={submitCode}><div className="sent-note"><Icon name="check" size={18} /><span>أرسلنا الرمز إلى <b dir="ltr">{email}</b></span></div><label>رمز التحقق<input className="otp-input" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="000000" dir="ltr" autoFocus /></label><button className="button button-primary button-wide" type="submit">التحقق والدخول</button><button className="button button-tertiary button-wide" type="button" onClick={() => setStep("email")}>تغيير البريد</button></form>}
      {step === "done" && <div className="auth-success"><span><Icon name="check" size={28} /></span><h3>تمت المحاكاة بنجاح</h3><p>في النسخة الحقيقية سيُتحقق من الرمز عبر Supabase Auth.</p><Link className="button button-primary button-wide" href="/dashboard">فتح لوحة التشغيل</Link></div>}
    </AuthFrame>
  );
}

export function RegisterPage() {
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setDone(true); };
  return (
    <AuthFrame title="طلب الانضمام" description="الحسابات المؤسسية تُنشأ بدعوة أو بعد مراجعة طلب الجهة.">
      {!done ? <form className="auth-form" onSubmit={submit}><label>الاسم الكامل<input required autoComplete="name" /></label><label>البريد المؤسسي<input required type="email" autoComplete="email" dir="ltr" /></label><label>اسم الجهة<input required /></label><label>رمز الدعوة <small>اختياري إذا لم تصلك دعوة</small><input dir="ltr" placeholder="INV-XXXXX" /></label><label>الدور المطلوب<select defaultValue="trainer"><option value="owner">مدير جهة</option><option value="trainer">مدرب</option><option value="viewer">مراجع نتائج</option></select></label><button className="button button-primary button-wide" type="submit">إرسال الطلب</button><p className="auth-alternative">لديك حساب؟ <Link href="/login">تسجيل الدخول</Link></p></form> : <div className="auth-success"><span><Icon name="mail" size={28} /></span><h3>استُلم الطلب التجريبي</h3><p>سيُراجع الطلب قبل منح الوصول إلى بيانات أي جهة.</p><Link className="button button-secondary button-wide" href="/login">العودة لتسجيل الدخول</Link></div>}
    </AuthFrame>
  );
}
