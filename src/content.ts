export interface SiteContent {
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problems: {
    sectionLabel: string;
    sectionTitle: string;
    items: { title: string; description: string }[];
  };
  solutions: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    format1Title: string;
    format1Description: string;
    format1Features: string[];
    format2Title: string;
    format2Description: string;
    format2Features: string[];
  };
  services: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    cards: {
      title: string;
      price: string;
      description: string;
      features: string[];
      popular: boolean;
    }[];
  };
  oneTimeServices: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    cards: {
      title: string;
      pain: string;
      description: string;
      price: string;
      buttonText: string;
    }[];
  };
  process: {
    sectionLabel: string;
    sectionTitle: string;
    badgeText: string;
    steps: { title: string; description: string }[];
  };
  advantages: {
    sectionLabel: string;
    sectionTitle: string;
    items: { title: string; description: string }[];
  };
  contact: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    successTitle: string;
    successMessage: string;
    button: string;
    privacyNote: string;
  };
  footer: {
    brand: string;
    email: string;
    telegram: string;
    telegramUrl: string;
    copyright: string;
  };
}

export const defaultContent: SiteContent = {
  hero: {
    badge: 'Маркетплейсы + ИИ-автоматизация',
    title1: 'Системное ведение',
    title2: 'маркетплейсов',
    subtitle: 'Wildberries и Ozon под ключ. Разработка ИИ-агентов, которые берут на себя рутину — пока вы занимаетесь стратегией бизнеса',
    ctaPrimary: 'Оставить заявку',
    ctaSecondary: 'Смотреть услуги',
  },
  problems: {
    sectionLabel: 'Знакомые проблемы?',
    sectionTitle: 'Почему селлеры теряют деньги',
    items: [
      {
        title: 'Рутина съедает время',
        description: 'Ответы на отзывы, обновление SEO, аналитика продаж — всё это отнимает часы каждый день, не приближая к росту выручки.',
      },
      {
        title: 'Менеджер не даёт результата',
        description: 'Наёмный сотрудник работает «для галочки». Нет системы, нет отчётности, нет понимания — что конкретно сделано и какой эффект.',
      },
      {
        title: 'Хаос в коммуникации',
        description: 'Устные договорённости забываются. Задачи теряются. Непонятно, кто за что отвечает и в какие сроки.',
      },
    ],
  },
  solutions: {
    sectionLabel: 'Решение',
    sectionTitle: 'Два формата работы',
    sectionSubtitle: 'Выберите подходящий вариант или комбинируйте — оба подхода дают измеримый результат',
    format1Title: 'Ведение кабинета',
    format1Description: 'Полное системное управление вашим магазином на маркетплейсе. Беру на себя всю операционку — от создания карточек до аналитики и стратегии продвижения.',
    format1Features: ['SEO-оптимизация карточек', 'Управление отзывами и вопросами', 'Аналитика и отчётность', 'Ценообразование и акции', 'Планирование поставок'],
    format2Title: 'Разработка ИИ-агента',
    format2Description: 'Создаю персонального ИИ-агента под ваши задачи. Он автоматизирует рутинные процессы и работает 24/7 без перерывов и отпусков.',
    format2Features: ['Автоответы на отзывы и вопросы', 'Генерация SEO-описаний', 'Мониторинг цен конкурентов', 'Автоматические отчёты', 'Интеграция с вашими системами'],
  },
  services: {
    sectionLabel: 'Услуги и цены',
    sectionTitle: 'Прозрачные условия',
    sectionSubtitle: 'Фиксированные цены. Никаких скрытых платежей. Всё фиксируется в договоре.',
    cards: [
      {
        title: 'Ведение кабинета',
        price: 'от 30 000 ₽/мес',
        description: 'Полное управление магазином на Wildberries или Ozon. Все задачи — под контролем.',
        features: ['SEO карточек', 'Отзывы и вопросы', 'Аналитика продаж', 'Еженедельные отчёты', 'Стратегия продвижения'],
        popular: false,
      },
      {
        title: 'ИИ-агент под ключ',
        price: 'от 50 000 ₽',
        description: 'Разработка и внедрение ИИ-агента для автоматизации конкретных задач вашего бизнеса.',
        features: ['Анализ задач', 'Разработка агента', 'Тестирование', 'Внедрение', 'Поддержка 30 дней'],
        popular: true,
      },
      {
        title: 'Комплекс',
        price: 'от 70 000 ₽/мес',
        description: 'Ведение кабинета + ИИ-агент. Максимальная автоматизация и системный подход.',
        features: ['Всё из "Ведения"', 'Персональный ИИ-агент', 'Приоритетная поддержка', 'Ежедневные отчёты', 'Письменные стратегические рекомендации'],
        popular: false,
      },
    ],
  },
  oneTimeServices: {
    sectionLabel: 'Одноразовые услуги',
    sectionTitle: 'Одноразовые услуги для быстрого результата',
    sectionSubtitle: 'Решения, которые не требуют ежемесячной подписки. Оплата один раз — инструмент работает на вас постоянно.',
    cards: [
      {
        title: 'SEO-оптимизация 1 карточки',
        pain: 'Товар есть, но его не находят покупатели, а писать тексты вручную долго.',
        description: 'Вы даете ссылку на таблицу. Мой ИИ-агент автоматически проводит аудит, собирает релевантные ключевые слова и выдает готовое, оптимизированное описание и заголовки. Без ручного разбора.',
        price: 'от 3 000 ₽',
        buttonText: 'Заказать',
      },
      {
        title: 'ИИ-агент «Мастер ответов»',
        pain: 'Копятся отзывы и вопросы, рейтинг падает из-за долгих ответов.',
        description: 'Создаю и настраиваю бота, который анализирует тональность новых отзывов и вопросов, а затем выдает 2–3 готовых варианта вежливого, продающего ответа. Вам остается только скопировать или одобрить.',
        price: 'от 15 000 ₽',
        buttonText: 'Заказать',
      },
      {
        title: 'Разработка ИИ-агента под вашу задачу',
        pain: 'Специфическая рутина (сбор цен, аналитика, создание ТЗ) съедает часы работы штатного сотрудника.',
        description: 'Изучаю ваш процесс в письменном виде, составляю четкое ТЗ, собираю и внедряю персонального ИИ-агента, который выполняет эту задачу автономно 24/7.',
        price: 'от 30 000 ₽',
        buttonText: 'Заказать',
      },
    ],
  },
  process: {
    sectionLabel: 'Порядок работы',
    sectionTitle: '4 шага до результата',
    badgeText: 'Работа только в письменном виде — без созвонов',
    steps: [
      { title: 'Заявка и бриф', description: 'Вы оставляете заявку и описываете задачу в письменном виде. Без звонков и созвонов.' },
      { title: 'Коммерческое предложение', description: 'В течение 24 часов отправляю подробное КП с ценами, сроками и планом работ.' },
      { title: 'Договор и старт', description: 'Фиксируем всё в договоре. Оплата по этапам. Начинаем работу сразу после подписания.' },
      { title: 'Работа и отчётность', description: 'Регулярные письменные отчёты. Все правки — в переписке. Результат — измеримый.' },
    ],
  },
  advantages: {
    sectionLabel: 'Преимущества',
    sectionTitle: 'Почему выбирают меня',
    items: [
      { title: 'Всё в письменном виде', description: 'Никаких устных договорённостей. Каждая задача, каждый срок, каждый результат — зафиксирован в переписке.' },
      { title: 'Измеримый результат', description: 'Конкретные цифры в отчетах и четкие сроки. Вы видите рост выручки, конверсии, позиции в выдаче.' },
      { title: 'Технологичный подход', description: 'Использую ИИ-агентов для автоматизации. Это не просто «менеджер» — это система, которая масштабируется.' },
    ],
  },
  contact: {
    sectionLabel: 'Контакты',
    sectionTitle: 'Оставьте заявку',
    sectionSubtitle: 'Опишите задачу — отвечу в течение 24 часов с конкретным предложением',
    successTitle: 'Заявка отправлена!',
    successMessage: 'Спасибо за обращение. Я свяжусь с вами в течение 24 часов в указанном мессенджере.',
    button: 'Отправить заявку',
    privacyNote: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности',
  },
  footer: {
    brand: 'Маркетплейс + ИИ',
    email: 'hello@example.com',
    telegram: 'Telegram',
    telegramUrl: 'https://t.me/username',
    copyright: 'Все права защищены',
  },
};

const STORAGE_KEY = 'site_content_v1';

export function loadContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultContent, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load content:', e);
  }
  return defaultContent;
}

export function saveContent(content: SiteContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error('Failed to save content:', e);
  }
}

export function resetContent(): SiteContent {
  localStorage.removeItem(STORAGE_KEY);
  return defaultContent;
}

export function exportContent(content: SiteContent): string {
  return JSON.stringify(content, null, 2);
}

export function importContent(json: string): SiteContent | null {
  try {
    const parsed = JSON.parse(json);
    return { ...defaultContent, ...parsed };
  } catch {
    return null;
  }
}
