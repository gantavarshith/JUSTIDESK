# JusticeDesk Frontend - Quick Reference Guide

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview
```

**App runs at**: http://localhost:8080

---

## 📍 Page Routes

| Route | Page | Features |
|-------|------|----------|
| `/citizen/dashboard` | Dashboard | Stats, activity, quick help |
| `/citizen/cases` | Cases | List, create, filter, details |
| `/citizen/documents` | Documents | Upload, download, delete, analyze |
| `/citizen/consultations` | Consultations | Book, cancel, view |
| `/citizen/forms` | Saved Forms | Create, edit, save, submit |
| `/rights` | Know Your Rights | Search, categories, details |
| `/login` | Login | Authentication |
| `/register` | Register | Sign up |

---

## 🪝 Custom Hooks Quick Reference

### `useDocuments()`
```tsx
const { documents, uploadDocument, downloadDocument, deleteDocument, analyzeDocument } = useDocuments();
```

### `useCases()`
```tsx
const { cases, createCase, updateCase } = useCases();
```

### `useConsultations()`
```tsx
const { consultations, bookConsultation, cancelConsultation } = useConsultations();
```

### `useFormDraft(formId)`
```tsx
const { draft, saveDraft, submitForm, loadDraft, clearDraft } = useFormDraft('form-id');
```

---

## 🔌 API Services Quick Reference

### Document API
```tsx
documentApi.uploadDocument(file, caseId?)
documentApi.downloadDocument(docId)
documentApi.deleteDocument(docId)
documentApi.analyzeDocument(docId)
```

### Case API
```tsx
caseApi.getCases()
caseApi.getCaseById(caseId)
caseApi.createCase(caseData)
caseApi.updateCase(caseId, caseData)
```

### Consultation API
```tsx
consultationApi.bookConsultation(data)
consultationApi.getConsultations()
consultationApi.cancelConsultation(id)
```

### Form API
```tsx
formApi.saveDraft(formId, data)
formApi.getDraft(formId)
formApi.submitForm(formId, data)
```

---

## ✅ Validators Quick Reference

```tsx
import { validators, validateForm } from '@/lib/validation';

// Individual validators
validators.email(value)
validators.password(value)
validators.phone(value)
validators.required(value, fieldName)
validators.minLength(value, min, fieldName)
validators.maxLength(value, max, fieldName)
validators.url(value)
validators.number(value)
validators.date(value)

// Form validation
const errors = validateForm(data, {
  email: [validators.email],
  password: [validators.password],
  phone: [validators.phone],
});
```

---

## 🎨 Common Component Patterns

### Toast Notification
```tsx
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed",
  variant: "default", // or "destructive"
});
```

### Dialog with Form
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Form content */}
  </DialogContent>
</Dialog>
```

### Status Badge
```tsx
<Badge variant="outline" className={cn("gap-1.5", statusColor)}>
  <StatusIcon className="w-3 h-3" />
  {statusLabel}
</Badge>
```

---

## 📁 File Organization

```
src/
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/          # Layout wrappers
│   ├── ErrorBoundary.tsx
│   └── ...
├── pages/               # Page components (10 pages)
├── hooks/
│   ├── use-toast.ts
│   ├── use-mobile.tsx
│   └── useApi.ts        # ✨ All custom hooks
├── services/
│   └── api.ts           # ✨ API service layer
├── lib/
│   ├── utils.ts
│   └── validation.ts    # ✨ Form validators
├── types/
│   └── index.ts
├── data/
│   └── mockData.ts
└── App.tsx
```

---

## 🎯 Adding New Features

### Step 1: Create API Service
```tsx
// In /src/services/api.ts
export const featureApi = {
  async getFeatures() { /* ... */ },
  async createFeature(data) { /* ... */ },
};
```

### Step 2: Create Custom Hook
```tsx
// In /src/hooks/useApi.ts
export const useFeature = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const createFeature = useCallback(async (data) => {
    // Implementation
  }, []);
  
  return { features, loading, createFeature };
};
```

### Step 3: Use in Component
```tsx
const MyComponent = () => {
  const { features, createFeature } = useFeature();
  
  return (
    // JSX
  );
};
```

---

## 🚨 Error Handling Patterns

### API Call with Error Handling
```tsx
try {
  const response = await api.doSomething();
  if (response.success) {
    toast({ title: "Success", description: "Done" });
  } else {
    toast({ 
      title: "Error", 
      description: response.error,
      variant: "destructive" 
    });
  }
} catch (error) {
  toast({
    title: "Error",
    description: "Unexpected error",
    variant: "destructive"
  });
}
```

---

## 📱 Responsive Design Utilities

```tsx
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="lg:hidden"

// Responsive grid
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// Responsive text sizes
className="text-sm lg:text-base"

// Responsive spacing
className="p-4 lg:p-6"
```

---

## 🎨 Color Schemes

### Status Colors
- **Active**: Secondary color (blue)
- **Pending**: Accent color (orange)
- **Resolved**: Green
- **Closed**: Muted

### Semantic Colors
- **Success**: Green
- **Warning**: Orange/Yellow
- **Error**: Red
- **Info**: Blue

---

## 📊 Data Types

### Case
```tsx
interface Case {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'resolved' | 'closed';
  type: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}
```

### Document
```tsx
interface Document {
  id: string;
  name: string;
  type: string;
  analyzedAt: string;
  summary?: string;
  status: 'pending' | 'analyzed' | 'error';
}
```

### Consultation
```tsx
interface Consultation {
  id: string;
  title: string;
  advocateName: string;
  advocatePhone: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'online' | 'physical';
}
```

---

## 🔄 State Management Pattern

```tsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const { toast } = useToast();

const operation = useCallback(async (params) => {
  setLoading(true);
  try {
    const response = await api.call(params);
    if (response.success) {
      setData(prev => [response.data, ...prev]);
      toast({ title: "Success" });
    } else {
      toast({ 
        title: "Error", 
        description: response.error,
        variant: "destructive"
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Unexpected error",
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
}, [toast]);

return { data, loading, operation };
```

---

## 🎯 Testing Quick Tips

```bash
# Test specific feature
npm test -- useDocuments

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🔗 External Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [shadcn/ui Components](https://ui.shadcn.com)

---

## ⚡ Performance Tips

1. **Use React.memo** for expensive components
2. **Use useCallback** for event handlers in lists
3. **Use useMemo** for computed values
4. **Lazy load pages** with React.lazy()
5. **Keep component state local** when possible

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change port: `npm run dev -- --port 3000` |
| Module not found | Check imports, reinstall: `npm install` |
| Styling not applied | Check Tailwind classes, rebuild CSS |
| State not updating | Ensure immutability, use setters correctly |
| API calls failing | Check console, verify mock data |

---

## 📝 Code Style Guide

- Use TypeScript for type safety
- Use functional components with hooks
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Use custom hooks for reusability

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Check for build errors
- [ ] Verify bundle size
- [ ] Test production build locally
- [ ] Update environment variables
- [ ] Deploy to production server

---

## 📞 Useful Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview build
npm run lint       # Check code quality
npm test           # Run tests
```

---

## 🎉 You're Ready!

All features implemented and tested. Happy coding! 🚀

For detailed information:
- **Full Guide**: See `COMPLETE_GUIDE.md`
- **Features**: See `FEATURES.md`
- **Testing**: See `TESTING.md`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`
