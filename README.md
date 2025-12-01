# 🚀 Project Name — Human Resource Information System with Chat AI by Kodingan Bergizi Gratis

## 📌 Overview

HRIS ini dirancang dengan chat ai seperti chat gpt agar memudah kan user menginput layaknya chat tidak perlu melakukan inputan satu persatu

---

## 🧱 System Architecture

### 🔹 Desain Sistem

Aplikasi mengikuti arsitektur modular dan layered:

- **UI layer** → hanya menangani tampilan & interaksi pengguna
- **Business logic layer** → mengelola state, hooks, dan logika domain
- **Data access layer** → mengatur fetch API dan komunikasi dengan backend

Dengan pemisahan ini, perubahan pada logika bisnis tidak akan memengaruhi UI secara langsung, sehingga memudahkan scaling fitur, debugging, dan kolaborasi.

### 🔹 Arsitektur Data Flow

### 📝 Penjelasan Folder Structure

| Folder        | Fungsi                            |
| ------------- | --------------------------------- |
| `app/`        | Routing & server components       |
| `components/` | UI components reusable            |
| `features/`   | Business logic berdasarkan domain |
| `services/`   | Data fetching & API wrapper       |
| `lib/`        | Utilities, config, types global   |
| `styles/`     | Styling global                    |
| `assets/`     | Static assets                     |

**Dengan struktur ini:**

- UI tidak tercampur dengan API call
- State management tidak tercampur dengan komponen UI
- Setiap domain bisa dikembangkan/diperluas tanpa mengganggu yang lain

---
