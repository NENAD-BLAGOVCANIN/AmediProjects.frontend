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
    fallbackLng: 'en',
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
          },
          greeting: {
            welcome: "Welcome",
            welcome_back: "Welcome Back",
          },
          card_title: {
            employee_performance: "Employee performance",
            late_tasks: "Late tasks",
            todays_meetings: "Today's meetings",
            my_calendar: "My calendar",
          },
          login: {
            remember_me: "Remember Me",
            trouble_logging_in: "Trouble logging in?",
            login: "Login",
            email: "Email",
            password: "Password",
          },
          user_dropdown: {
            admin_panel: "Admin Panel",
            my_profile: "My Profile",
            logout: "Logout"
          }
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
          },
          greeting: {
            welcome: "ברוכים הבאים",
            welcome_back: "ברוך הבא",
          },
          card_title: {
            employee_performance: "תפוקת עובדים",
            late_tasks: "משימות עתידיות",
            todays_meetings: "פגישות היום",
            my_calendar: "יומן",
          },
          login: {
            remember_me: "זכור אותי",
            trouble_logging_in: "לא מצליח להתחבר?",
            login: "התחבר",
            email: "אימייל",
            password: "סיסמא",
          },
          user_dropdown: {
            admin_panel: "פאנל פרוייקטים",
            my_profile: "הפרופיל שלי",
            logout: "התנתק"
          }
        },
      }
    }
  }
  );

export default i18n;
