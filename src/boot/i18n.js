import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default defineBoot(({ app }) => {
  // Obtener el idioma guardado en localStorage o usar español por defecto
  const savedLang = localStorage.getItem('lang') || 'es-MX';

  const i18n = createI18n({
    locale: savedLang,  // Se usa 'es-MX' si no hay idioma guardado
    fallbackLocale: 'es-MX', // Si no encuentra traducción, usa español
    globalInjection: true,
    messages
  });


  // Guardar 'es-MX' en localStorage si aún no está guardado
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'es-MX');
  }

  // Aplicar i18n a la app
  app.use(i18n);
});
