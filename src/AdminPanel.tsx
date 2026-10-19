import { useState, useRef } from 'react';
import { useContent } from './ContentContext';
import { 
  Save, RotateCcw, Download, Upload, X, ChevronDown, ChevronRight,
  AlertTriangle, CheckCircle2, Plus, Trash2
} from 'lucide-react';

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
      </button>
      {open && <div className="p-4 space-y-3 bg-white">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', textarea = false }: { 
  label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean 
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );
}

function ArrayEditor({ 
  label, items, fields, path, onUpdate, onAdd, onRemove 
}: { 
  label: string; 
  items: any[]; 
  fields: { name: string; label: string; textarea?: boolean }[];
  path: string;
  onUpdate: (index: number, field: string, value: any) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <button onClick={onAdd} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
          <Plus className="w-3 h-3" /> Добавить
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="space-y-2 pr-6">
              {fields.map(field => (
                <div key={field.name}>
                  <label className="block text-xs text-gray-500 mb-0.5">{field.label}</label>
                  {field.textarea ? (
                    <textarea
                      value={item[field.name] || ''}
                      onChange={e => onUpdate(index, field.name, e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[field.name] || ''}
                      onChange={e => onUpdate(index, field.name, e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPanel() {
  const { 
    content, updateContent, updateArrayItem, addArrayItem, removeArrayItem,
    save, reset, exportData, importData, hasUnsavedChanges 
  } = useContent();
  
  const [isOpen, setIsOpen] = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    save();
    notify('success', 'Изменения сохранены!');
  };

  const handleReset = () => {
    if (confirm('Сбросить все изменения к значениям по умолчанию?')) {
      reset();
      notify('success', 'Контент сброшен к значениям по умолчанию');
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('success', 'Контент экспортирован');
  };

  const handleImport = () => {
    const result = importData(importText);
    if (result) {
      setShowImport(false);
      setImportText('');
      notify('success', 'Контент импортирован. Не забудьте сохранить!');
    } else {
      notify('error', 'Ошибка: неверный формат JSON');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const result = importData(text);
      if (result) {
        notify('success', 'Контент импортирован из файла. Не забудьте сохранить!');
      } else {
        notify('error', 'Ошибка: неверный формат файла');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        ⚙️ Админ
      </button>
    );
  }

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[10000] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {notification.message}
        </div>
      )}

      {/* Admin Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[9999] flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="font-bold text-gray-800 text-sm">Админ-панель</span>
            {hasUnsavedChanges && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                несохранено
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-200 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Сохранить
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Сброс
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Экспорт
          </button>
          <button
            onClick={() => setShowImport(!showImport)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" /> Импорт
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
            title="Импорт из файла"
          >
            📁
          </button>
        </div>

        {/* Import modal */}
        {showImport && (
          <div className="px-4 py-3 border-b border-gray-200 bg-amber-50">
            <label className="block text-xs font-medium text-gray-600 mb-1">Вставьте JSON:</label>
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              rows={4}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder='{"hero": {"title1": "..."}}'
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleImport} className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                Импортировать
              </button>
              <button onClick={() => { setShowImport(false); setImportText(''); }} className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Content editor */}
        <div className="flex-1 overflow-y-auto admin-scroll px-4 py-4 space-y-3">
          {/* Hero */}
          <Section title="🏠 Первый экран" defaultOpen>
            <Field label="Бейдж" value={content.hero.badge} onChange={v => updateContent('hero.badge', v)} />
            <Field label="Заголовок (строка 1)" value={content.hero.title1} onChange={v => updateContent('hero.title1', v)} />
            <Field label="Заголовок (строка 2, акцент)" value={content.hero.title2} onChange={v => updateContent('hero.title2', v)} />
            <Field label="Подзаголовок" value={content.hero.subtitle} onChange={v => updateContent('hero.subtitle', v)} textarea />
            <Field label="Кнопка основная" value={content.hero.ctaPrimary} onChange={v => updateContent('hero.ctaPrimary', v)} />
            <Field label="Кнопка вторичная" value={content.hero.ctaSecondary} onChange={v => updateContent('hero.ctaSecondary', v)} />
          </Section>

          {/* Problems */}
          <Section title="⚠️ Проблемы клиента">
            <Field label="Метка секции" value={content.problems.sectionLabel} onChange={v => updateContent('problems.sectionLabel', v)} />
            <Field label="Заголовок" value={content.problems.sectionTitle} onChange={v => updateContent('problems.sectionTitle', v)} />
            <ArrayEditor
              label="Пункты проблем"
              items={content.problems.items}
              fields={[
                { name: 'title', label: 'Заголовок' },
                { name: 'description', label: 'Описание', textarea: true },
              ]}
              path="problems.items"
              onUpdate={(i, f, v) => updateArrayItem('problems.items', i, f, v)}
              onAdd={() => addArrayItem('problems.items', { title: 'Новая проблема', description: 'Описание' })}
              onRemove={(i) => removeArrayItem('problems.items', i)}
            />
          </Section>

          {/* Solutions */}
          <Section title="💡 Решение">
            <Field label="Метка секции" value={content.solutions.sectionLabel} onChange={v => updateContent('solutions.sectionLabel', v)} />
            <Field label="Заголовок" value={content.solutions.sectionTitle} onChange={v => updateContent('solutions.sectionTitle', v)} />
            <Field label="Подзаголовок" value={content.solutions.sectionSubtitle} onChange={v => updateContent('solutions.sectionSubtitle', v)} textarea />
            <div className="border-t pt-3 mt-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">Формат 1: Ведение кабинета</p>
              <Field label="Заголовок" value={content.solutions.format1Title} onChange={v => updateContent('solutions.format1Title', v)} />
              <Field label="Описание" value={content.solutions.format1Description} onChange={v => updateContent('solutions.format1Description', v)} textarea />
              <div className="mt-2">
                <label className="block text-xs text-gray-500 mb-1">Список (каждый пункт с новой строки)</label>
                <textarea
                  value={content.solutions.format1Features.join('\n')}
                  onChange={e => updateContent('solutions.format1Features', e.target.value.split('\n').filter(Boolean))}
                  rows={4}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                />
              </div>
            </div>
            <div className="border-t pt-3 mt-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">Формат 2: ИИ-агент</p>
              <Field label="Заголовок" value={content.solutions.format2Title} onChange={v => updateContent('solutions.format2Title', v)} />
              <Field label="Описание" value={content.solutions.format2Description} onChange={v => updateContent('solutions.format2Description', v)} textarea />
              <div className="mt-2">
                <label className="block text-xs text-gray-500 mb-1">Список (каждый пункт с новой строки)</label>
                <textarea
                  value={content.solutions.format2Features.join('\n')}
                  onChange={e => updateContent('solutions.format2Features', e.target.value.split('\n').filter(Boolean))}
                  rows={4}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                />
              </div>
            </div>
          </Section>

          {/* Services */}
          <Section title="💰 Услуги и цены">
            <Field label="Метка секции" value={content.services.sectionLabel} onChange={v => updateContent('services.sectionLabel', v)} />
            <Field label="Заголовок" value={content.services.sectionTitle} onChange={v => updateContent('services.sectionTitle', v)} />
            <Field label="Подзаголовок" value={content.services.sectionSubtitle} onChange={v => updateContent('services.sectionSubtitle', v)} textarea />
            {content.services.cards.map((card, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
                <button
                  onClick={() => removeArrayItem('services.cards', index)}
                  className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="space-y-2 pr-6">
                  <Field label="Название" value={card.title} onChange={v => updateArrayItem('services.cards', index, 'title', v)} />
                  <Field label="Цена" value={card.price} onChange={v => updateArrayItem('services.cards', index, 'price', v)} />
                  <Field label="Описание" value={card.description} onChange={v => updateArrayItem('services.cards', index, 'description', v)} textarea />
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Фичи (каждая с новой строки)</label>
                    <textarea
                      value={card.features.join('\n')}
                      onChange={e => updateArrayItem('services.cards', index, 'features', e.target.value.split('\n').filter(Boolean))}
                      rows={3}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={card.popular}
                      onChange={e => updateArrayItem('services.cards', index, 'popular', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs text-gray-600">Популярный (выделенная карточка)</span>
                  </label>
                </div>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('services.cards', { title: 'Новая услуга', price: 'от 0 ₽', description: 'Описание', features: ['Фича 1'], popular: false })}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2"
            >
              <Plus className="w-3 h-3" /> Добавить карточку
            </button>
          </Section>

          {/* Process */}
          <Section title="📋 Порядок работы">
            <Field label="Метка секции" value={content.process.sectionLabel} onChange={v => updateContent('process.sectionLabel', v)} />
            <Field label="Заголовок" value={content.process.sectionTitle} onChange={v => updateContent('process.sectionTitle', v)} />
            <Field label="Текст бейджа" value={content.process.badgeText} onChange={v => updateContent('process.badgeText', v)} />
            <ArrayEditor
              label="Шаги"
              items={content.process.steps}
              fields={[
                { name: 'title', label: 'Заголовок' },
                { name: 'description', label: 'Описание', textarea: true },
              ]}
              path="process.steps"
              onUpdate={(i, f, v) => updateArrayItem('process.steps', i, f, v)}
              onAdd={() => addArrayItem('process.steps', { title: 'Новый шаг', description: 'Описание' })}
              onRemove={(i) => removeArrayItem('process.steps', i)}
            />
          </Section>

          {/* Advantages */}
          <Section title="⭐ Преимущества">
            <Field label="Метка секции" value={content.advantages.sectionLabel} onChange={v => updateContent('advantages.sectionLabel', v)} />
            <Field label="Заголовок" value={content.advantages.sectionTitle} onChange={v => updateContent('advantages.sectionTitle', v)} />
            <ArrayEditor
              label="Пункты"
              items={content.advantages.items}
              fields={[
                { name: 'title', label: 'Заголовок' },
                { name: 'description', label: 'Описание', textarea: true },
              ]}
              path="advantages.items"
              onUpdate={(i, f, v) => updateArrayItem('advantages.items', i, f, v)}
              onAdd={() => addArrayItem('advantages.items', { title: 'Новое преимущество', description: 'Описание' })}
              onRemove={(i) => removeArrayItem('advantages.items', i)}
            />
          </Section>

          {/* Contact */}
          <Section title="📨 Форма заявки">
            <Field label="Метка секции" value={content.contact.sectionLabel} onChange={v => updateContent('contact.sectionLabel', v)} />
            <Field label="Заголовок" value={content.contact.sectionTitle} onChange={v => updateContent('contact.sectionTitle', v)} />
            <Field label="Подзаголовок" value={content.contact.sectionSubtitle} onChange={v => updateContent('contact.sectionSubtitle', v)} textarea />
            <Field label="Текст кнопки" value={content.contact.button} onChange={v => updateContent('contact.button', v)} />
            <Field label="Заголовок успеха" value={content.contact.successTitle} onChange={v => updateContent('contact.successTitle', v)} />
            <Field label="Сообщение успеха" value={content.contact.successMessage} onChange={v => updateContent('contact.successMessage', v)} textarea />
            <Field label="Примечание о приватности" value={content.contact.privacyNote} onChange={v => updateContent('contact.privacyNote', v)} />
          </Section>

          {/* Footer */}
          <Section title="🔻 Подвал">
            <Field label="Название бренда" value={content.footer.brand} onChange={v => updateContent('footer.brand', v)} />
            <Field label="Email" value={content.footer.email} onChange={v => updateContent('footer.email', v)} />
            <Field label="Telegram текст" value={content.footer.telegram} onChange={v => updateContent('footer.telegram', v)} />
            <Field label="Telegram URL" value={content.footer.telegramUrl} onChange={v => updateContent('footer.telegramUrl', v)} />
            <Field label="Копирайт" value={content.footer.copyright} onChange={v => updateContent('footer.copyright', v)} />
          </Section>

          {/* Info */}
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Доступ:</strong> добавьте <code className="bg-blue-100 px-1 rounded">#admin</code> к URL сайта.
              Данные хранятся в браузере (localStorage). Используйте «Экспорт» для бэкапа.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
