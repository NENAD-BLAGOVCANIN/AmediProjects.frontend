import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          sidebar: {
            home: "Home",
            tasks: "Tasks",
            products: "Products",
            team: "Team",
            contacts: "Contacts",
            leads: "Leads",
            clients: "Clients",
            notifications: "Notifications",
            my_schedule: "My schedule",
            performance: "Performance",
            preferences: "Preferences",
            project: "Project",
            crm: "CRM",
            personal: "Personal",
            projects:"projects",
            collection:"collection"
          },
          greeting: {
            welcome: "Welcome",
            welcome_back: "Welcome Back",
          },
          card_title: {
            employee_performance: "Employee performance",
            late_tasks: "tasks",
            todays_meetings: "Today's meetings",
            my_calendar: "My calendar",
            current_project:"current project",
            new_project:"new project",
            ceo_tasks:"ceo tasks",
          },
          Notifications:{
            New_Notifications:"New Notifications"
          },
          login: {
            remember_me: "Remember Me",
            trouble_logging_in: "Trouble logging in?",
            login: "Login",
            email: "Email",
            password: "Password",
          },
          add_new_project:{
            add_new_project:"add new project",
            planing:"planing",
            company_name:"company name",
            project_name:"project name",
            place:"place",
            contact_person:"contact person",
            details:"details",
            upload_file:"upload contact",
            products:"products",
            submit:"submit",
            projectCreated:"projects Created",
          },
          addNewProject:{
            add_new_project:"",
          },
          user_dropdown: {
            admin_panel: "Admin Panel",
            my_profile: "My Profile",
            logout: "Logout"
          },
          leads:{
            title:"title",
            name:"name",
            phone:"phone",
            status:"status",
            company_name:"company_name",
            last_contact:"last_contact",
          },
        }
      },
      he: {
        translation: {
          sidebar: {
            home: "בית",
            tasks: "משימות",
            products: "מוצרים",
            team: "צוות",
            contacts: "אנשי קשר",
            leads: "לידים",
            clients: "לקוחות",
            notifications: "התראות",
            my_schedule: "לוח זמנים",
            performance: "תפוקה",
            preferences: "העדפות",
            project: "פרוייקט",
            crm: "ניהול לוחות",
            personal: "איזור אישי",
            projects:'ניהול פרוייקטים',
            collection:'גבייה',
          },
          greeting: {
            welcome: "ברוכים הבאים",
            welcome_back: "ברוך הבא",
          },
          projects:{
            name:"name",
            status:"status",
            amount:"amount",
            delivered_projects:"collection projects status"
          },
          card_title: {
            employee_performance: "תפוקת עובדים",
            late_tasks: "משימות",
            todays_meetings: "פגישות היום",
            my_calendar: "יומן",
            current_project:"פרוייקטים קיימים",
            new_project:"הכנס פרוייקט חדש",
            ceo_tasks:"משימות מנכל",
          },
          login: {
            remember_me: "זכור אותי",
            trouble_logging_in: "לא מצליח להתחבר?",
            login: "התחבר",
            email: "אימייל",
            password: "סיסמא",
          },
          Notifications:{
            New_Notifications:"התראות חדשות"
          },
          add_new_project:{
            add_new_project:"הוספת פרוייקט חדש",
          },
          addNewProject:{
            add_new_project:"הוספת פרוייקט חדש",
            planing:"הוספת תכנון",
            measuring:"הוספת מדידה",
            measuring_status:"שינוי סטטוס לתכנון",
            planing_send:"שליחה לבדיקה",
            company_name:"שם חברה",
            project_name:"שם פרוייקט",
            place:"מיקום",
            contact_person:"איש קשר",
            details:"details",
            upload_file:"עלאת חוזה",
            products:"מוצרים",
            filter_products:"בחירת מוצרים",
            add_product:"הוספת מוצר",
            submit:"יצירת פרוייקט",
            projectCreated:"פרויקטים שנוצרו"
          },
          user_dropdown: {
            admin_panel: "פאנל פרוייקטים",
            my_profile: "הפרופיל שלי",
            logout: "התנתק"
          },
          projects:{
            name:"שם",
            status:"סטטוס",
            amount:"כמה נשאר לשלם",
            delivered_projects:"סטטוס גביית פרוייקטים"
          },
          leads:{
            title:"לקוחות פונטציאלים",
            name:"שם",
            phone:"טלפון",
            status:"סטטוס",
            company_name:"חברה",
            last_contact:"פעם אחרונה שנוצר קשר",
          },
        },
      },
      isRTL: true
    }
  }
);
i18n.on('languageChanged', (lng) => {
  const isRTL = i18n.getDataByLanguage(lng).isRTL || false;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
});

export default i18n;
