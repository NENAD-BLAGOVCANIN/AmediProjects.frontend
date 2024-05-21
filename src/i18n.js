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
            preferences: "Preferences"
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
          }
        }
      },
      he: {
        translation: {
          greeting: {
            welcome: "Dobrodošli"
          }
        }
      }
    }
  });

export default i18n;
