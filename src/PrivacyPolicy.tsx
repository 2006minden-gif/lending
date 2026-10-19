import { X } from 'lucide-react';
import { useEffect } from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-graphite">Политика конфиденциальности</h1>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm text-graphite-light hover:text-graphite hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Закрыть
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-graphite-light mb-8">
            Дата вступления в силу: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">1. Общие положения</h2>
            <p className="text-graphite-light leading-relaxed mb-3">
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта (далее — «Сайт»), расположенного по адресу, указанному в футере Сайта.
            </p>
            <p className="text-graphite-light leading-relaxed mb-3">
              Оставляя заявку на Сайте, Пользователь выражает согласие с условиями настоящей Политики и даёт согласие на обработку своих персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">2. Сбор персональных данных</h2>
            <p className="text-graphite-light leading-relaxed mb-3">
              При оформлении заявки через форму обратной связи на Сайте собираются следующие данные:
            </p>
            <ul className="list-disc pl-6 text-graphite-light space-y-2 mb-3">
              <li>Имя Пользователя</li>
              <li>Контактные данные (Telegram-ник или адрес электронной почты)</li>
              <li>Описание задачи, предоставленное Пользователем в свободной форме</li>
            </ul>
            <p className="text-graphite-light leading-relaxed">
              Дополнительно могут собираться технические данные: IP-адрес, информация о браузере, время посещения. Эти данные используются исключительно для обеспечения работы Сайта и защиты от злоупотреблений.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">3. Цели обработки данных</h2>
            <p className="text-graphite-light leading-relaxed mb-3">
              Персональные данные обрабатываются в следующих целях:
            </p>
            <ul className="list-disc pl-6 text-graphite-light space-y-2">
              <li>Обработка входящих заявок и связь с Пользователем</li>
              <li>Предоставление информации об услугах</li>
              <li>Заключение и исполнение договоров на оказание услуг</li>
              <li>Улучшение качества работы Сайта</li>
              <li>Защита от спама и мошеннических действий</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">4. Хранение и защита данных</h2>
            <p className="text-graphite-light leading-relaxed mb-3">
              Персональные данные хранятся на защищённых серверах и/или в сервисах приёма заявок (Telegram-бот, электронная почта). Принимаются все необходимые организационные и технические меры для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p className="text-graphite-light leading-relaxed">
              Срок хранения персональных данных — до момента достижения целей обработки или до отзыва согласия Пользователем.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">5. Передача данных третьим лицам</h2>
            <p className="text-graphite-light leading-relaxed">
              Персональные данные Пользователя не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации, а также для исполнения договора с Пользователем (например, передача данных в сервисы приёма сообщений — Telegram, почтовые сервисы).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">6. Права Пользователя</h2>
            <p className="text-graphite-light leading-relaxed mb-3">
              Пользователь имеет право:
            </p>
            <ul className="list-disc pl-6 text-graphite-light space-y-2">
              <li>Получить информацию о своих персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия в Роскомнадзор или в суд</li>
            </ul>
            <p className="text-graphite-light leading-relaxed mt-3">
              Для реализации своих прав Пользователь может направить запрос по контактным данным, указанным в футере Сайта.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">7. Cookies и аналитика</h2>
            <p className="text-graphite-light leading-relaxed mb-3">
              Сайт может использовать cookies для обеспечения корректной работы и сбора статистики посещений. На Сайте подключена система аналитики (Яндекс.Метрика), которая собирает обезличенные данные о посещениях.
            </p>
            <p className="text-graphite-light leading-relaxed">
              Пользователь может отключить cookies в настройках браузера. Это не повлияет на возможность оставить заявку.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">8. Изменение Политики</h2>
            <p className="text-graphite-light leading-relaxed">
              Настоящая Политика может быть изменена. Актуальная редакция всегда доступна на данной странице. Продолжение использования Сайта после внесения изменений означает согласие Пользователя с новой редакцией Политики.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-graphite mb-4">9. Контактная информация</h2>
            <p className="text-graphite-light leading-relaxed">
              По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться по контактам, указанным в футере Сайта (электронная почта или Telegram).
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300"
            >
              ← Вернуться на сайт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
