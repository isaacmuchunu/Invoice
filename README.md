# Pro-Invoice - Modern Invoice Management App

Pro-Invoice is a sleek and modern web application designed to streamline invoice and client management. Built with a professional UI and a focus on user experience, it provides all the essential tools for freelancers and small businesses to handle their billing efficiently. The application is fully responsive and features a clean, intuitive interface.

Since this is a demo application, it uses **`localStorage`** to persist all data, meaning no database is required. All your invoices, clients, and settings are saved directly in your browser.

## Features

-   **Interactive Dashboard**: Get a quick overview of your business with key stats like total revenue, number of invoices, and status breakdowns. A responsive chart visualizes your monthly revenue trends (Paid vs. Pending).
-   **Full Invoice Management (CRUD)**:
    -   Create professional, detailed invoices with multiple line items.
    -   View a paginated and searchable list of all your invoices.
    -   Filter invoices by status (`paid`, `pending`, `overdue`).
    -   Update existing invoices with a full-featured form.
    -   Delete invoices with a confirmation dialog to prevent accidental deletion.
    -   View a clean, printable detail page for each invoice.
-   **Full Client Management (CRUD)**:
    -   Add, view, edit, and delete clients.
    -   Search for clients by name or email.
    -   Client information is automatically available when creating new invoices.
-   **Customizable Settings**:
    -   Update your personal and company information (name, email, address), which automatically appears on your invoices.
    -   Choose between `light`, `dark`, and `system` themes to suit your preference.
-   **Modern UI/UX**:
    -   Built with **shadcn/ui** for a polished and consistent component library.
    -   Uses **`lucide-react`** for crisp, clean icons.
    -   **`recharts`** for beautiful and informative charts.
    -   **`sonner`** for non-intrusive toast notifications.
-   **Responsive Design**: The application is designed to work seamlessly across all devices, from desktops to mobile phones.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: React Hooks (`useState`, `useEffect`)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
-   **Charting**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (version 18 or later recommended) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pro-invoice.git
    cd pro-invoice
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. The app will automatically reload if you make any changes to the code.

---

This README provides a comprehensive overview of the project, its features, and how to get started. Enjoy managing your invoices!