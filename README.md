# CTA Creator

A powerful and flexible React-based tool for creating customizable Call-to-Action (CTA) components. This application allows users to design and customize various types of CTAs with a rich set of editing options and live preview capabilities.

## Features

- **Multiple CTA Components**
  - Title Editor
  - Button Editor
  - Card Editor
  - Form Editor
  - Image Editor
  - Paragraph Editor
  - Tag Editor
  - Others Editor

- **Rich Text Editing**
  - Integrated Quill Editor for advanced text formatting
  - HTML parsing support

- **Customization Options**
  - Color picker with opacity control
  - Border customization
  - Position adjustments
  - Typography settings
  - Icon selection with React Icons
  - Bootstrap class integration

- **Component Features**
  - Floating input boxes
  - Dynamic CTA template cards
  - Form question modals
  - Interactive dropdowns
  - Live preview with CardPreview

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **UI Framework:** Bootstrap 5 & React Bootstrap
- **Rich Text Editor:** Quill
- **Icon Library:** React Icons & Lucide React
- **HTML Parsing:** HTML React Parser
- **Notifications:** React Toastify

## Prerequisites

- Node.js (Latest LTS version)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd cta-creator
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── constants/         # Application constants and data
├── css/              # Global styles
├── CTA/              # CTA-specific components
├── layout/           # Layout components
├── schema/           # Data schemas
├── screens/          # Screen components
└── utils/            # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details