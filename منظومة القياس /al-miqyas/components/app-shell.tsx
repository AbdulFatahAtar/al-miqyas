"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";

const navigation: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/dashboard", label: "الملخص", icon: "overview" },
  { href: "/programs", label: "البرامج والدفعات", icon: "programs" },
  { href: "/trainees", label: "المتدرّبون", icon: "trainees" },
  { href: "/sessions", label: "الجلسات الحية", icon: "sessions" },
  { href: "/reports", label: "التقارير", icon: "reports" },
  { href: "/certificates", label: "الشهادات", icon: "certificates" },
  { href: "/organizations", label: "الجهات والأعضاء", icon: "organizations" },
  { href: "/settings", label: "الإعدادات", icon: "settings" },
];

const tenants = [
  { name: "كلية الطب · جامعة أم القرى", short: "ط", color: "#C9A24B" },
  { name: "أكاديمية الإتقان للتدريب", short: "إ", color: "#35C6E6" },
];

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tenantIndex, setTenantIndex] = useState(0);
  const [tenantOpen, setTenantOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const tenant = tenants[tenantIndex];

  const active = (href: string) => pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <div className="app-shell" style={{ "--tenant-accent": tenant.color } as React.CSSProperties}>
      {mobileOpen && <button className="sidebar-backdrop" aria-label="إغلاق القائمة" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="logo-pending" aria-label="شعار شركة الأمد قيد الإضافة">شعار</div>
          <div>
            <strong>منظومة المقياس</strong>
            <span>سجل الإتقان</span>
          </div>
          <button className="icon-button mobile-close" aria-label="إغلاق القائمة" onClick={() => setMobileOpen(false)}><Icon name="close" /></button>
        </div>

        <div className="tenant-switcher">
          <button type="button" className="tenant-trigger" aria-expanded={tenantOpen} onClick={() => setTenantOpen((value) => !value)}>
            <span className="tenant-avatar">{tenant.short}</span>
            <span><small>الجهة الحالية</small><strong>{tenant.name}</strong></span>
            <Icon name="chevron" size={15} />
          </button>
          {tenantOpen && (
            <div className="tenant-menu">
              {tenants.map((item, index) => (
                <button key={item.name} type="button" className={index === tenantIndex ? "selected" : ""} onClick={() => { setTenantIndex(index); setTenantOpen(false); }}>
                  <span className="tenant-avatar" style={{ background: item.color }}>{item.short}</span>
                  <span>{item.name}</span>
                  {index === tenantIndex && <Icon name="check" size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="main-nav" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={active(item.href) ? "nav-item nav-active" : "nav-item"} onClick={() => setMobileOpen(false)}>
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.href === "/sessions" && <i className="nav-count">1</i>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="environment-note"><span className="signal-dot" />بيانات تجريبية · غير متصلة</div>
          <Link href="/account" className={active("/account") ? "operator-card operator-active" : "operator-card"}>
            <span className="operator-avatar">م</span>
            <span><strong>مشرف الجهة</strong><small>Owner</small></span>
            <Icon name="chevron" size={15} />
          </Link>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-start">
            <button className="icon-button mobile-menu" aria-label="فتح القائمة" onClick={() => setMobileOpen(true)}><Icon name="menu" /></button>
            <div><small>منظومة المقياس</small><strong>{title ?? "لوحة التشغيل"}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="topbar-popover-wrap">
              <button className="icon-button" aria-label="الإشعارات" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((value) => !value); setAccountOpen(false); }}>
                <Icon name="bell" /><span className="notification-dot" />
              </button>
              {notificationsOpen && (
                <div className="topbar-popover notifications-popover">
                  <div className="popover-title"><strong>الإشعارات</strong><span>2 جديد</span></div>
                  <Link href="/reports" onClick={() => setNotificationsOpen(false)}><span className="status-pin success" /><span><strong>اكتمل تقرير دفعة يوليو</strong><small>منذ 8 دقائق</small></span></Link>
                  <Link href="/sessions" onClick={() => setNotificationsOpen(false)}><span className="status-pin warning" /><span><strong>جلسة تحتاج مطابقة معرّف</strong><small>منذ 24 دقيقة</small></span></Link>
                </div>
              )}
            </div>
            <div className="topbar-popover-wrap">
              <button className="account-trigger" aria-expanded={accountOpen} onClick={() => { setAccountOpen((value) => !value); setNotificationsOpen(false); }}>
                <span>م</span><div><strong>مشرف الجهة</strong><small>farhad@example.com</small></div><Icon name="chevron" size={14} />
              </button>
              {accountOpen && (
                <div className="topbar-popover account-popover">
                  <Link href="/account"><Icon name="account" size={17} />الملف الشخصي</Link>
                  <Link href="/settings"><Icon name="settings" size={17} />إعدادات الجهة</Link>
                  <Link href="/login" className="danger-link"><Icon name="logout" size={17} />تسجيل الخروج</Link>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function StatusBadge({ tone, children }: { tone: "success" | "warning" | "danger" | "system" | "muted"; children: ReactNode }) {
  return <span className={`status-badge badge-${tone}`}><i />{children}</span>;
}

export function DemoNotice() {
  return <div className="demo-notice"><Icon name="warning" size={17} /><span><strong>نسخة تجريبية قابلة للنقر.</strong> البيانات المعروضة ليست متصلة بقاعدة البيانات حتى الآن.</span></div>;
}
