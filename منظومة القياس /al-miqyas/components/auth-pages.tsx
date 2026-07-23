"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "./icons";
import { createSupabaseBrowserClient } from "../lib/supabase/client";

function AuthFrame({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
  return (
    <main className="auth-page">
      <section className="auth-story">
        <div className="auth-brand"><img className="brand-mark" src="/brand/al-amad-mark.png" alt="شعار شركة الأمد" /><span><strong>منظومة المقياس</strong><small>شركة الأمد</small></span></div>
        <div className="auth-statement"><span>قياس · وضوح · ثقة</span><h1>كل نتيجة لها مصدر، وكل شهادة لها دليل.</h1><p>منصة تشغيلية تجمع القياس القبلي والأداء اللحظي والقياس البعدي تحت معرّف واحد.</p></div>
        <div className="auth-pipeline" aria-hidden="true"><i className="done" /><i className="done" /><i className="active" /><i /><i /></div>
      </section>
      <section className="auth-panel">
        <div className="auth-panel-inner"><div className="auth-mobile-brand"><img className="brand-mark" src="/brand/al-amad-mark.png" alt="شعار شركة الأمد" /><strong>منظومة المقياس</strong></div><header><span className="eyebrow">دخول آمن عبر البريد</span><h2>{title}</h2><p>{description}</p></header>{children}<footer><Link href="/verify/VER-AMD-7K9FQ">التحقق من شهادة</Link><span>·</span><Link href="/t/AMD-7K9FQ">صفحة المتدرّب</Link></footer></div>
      </section>
    </main>
  );
}

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMessage("تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("تعذر الاتصال بخدمة الدخول. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame title="تسجيل الدخول" description="استخدم بريد الحساب وكلمة المرور التي أنشأتها في المنصة.">
      <form className="auth-form" onSubmit={submitLogin}>
        <label>البريد الإلكتروني<div className="input-with-icon"><Icon name="mail" size={18} /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" dir="ltr" /></div></label>
        <label>كلمة المرور<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" dir="ltr" /></label>
        {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
        <button className="button button-primary button-wide" type="submit" disabled={isSubmitting}>{isSubmitting ? "جارٍ تسجيل الدخول..." : <>تسجيل الدخول <Icon name="arrow" size={17} /></>}</button>
        <p className="auth-alternative">ليس لديك حساب؟ <Link href="/register">طلب الانضمام</Link></p>
      </form>
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
