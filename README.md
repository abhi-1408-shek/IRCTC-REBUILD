# IRCTC Modern Redesign

A modern, interactive redesign of the IRCTC web application with beautiful animations, transitions, and a user-friendly interface.

## Features

- Modern UI with glowing effects and smooth animations
- Light/Dark mode support
- Real-time train tracking with interactive map
- Smart ticket booking system
- Fully responsive design
- Fast and optimized performance
- Advanced search and filtering options

## Tech Stack

- **Frontend:**
  - React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Wouter for routing
  - Lucide React for icons

- **Backend:**
  - Node.js with Express
  - MongoDB for database
  - JWT for authentication

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/irctc-rebuild.git
   cd irctc-rebuild
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:
   Create `.env` files in both client and server directories:

   ```env
   # client/.env
   VITE_API_URL=http://localhost:3000

   # server/.env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development servers:
   ```bash
   # Run client (in client directory)
   npm run dev

   # Run server (in server directory)
   npm run dev
   ```

## Deployment on Netlify

### Frontend Deployment

1. Create a new site on Netlify:
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. Configure build settings:
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`
   - Base directory: `/`

3. Add environment variables:
   - Go to Site settings > Build & deploy > Environment
   - Add your environment variables from client/.env

4. Configure redirects:
   Create a `netlify.toml` in the root directory:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Backend Deployment

1. Deploy your server to a platform like Heroku or Railway
2. Update the VITE_API_URL in your Netlify environment variables to point to your deployed backend

## CI/CD Setup

The project includes GitHub Actions workflows for:
- Automated testing
- Linting
- Type checking
- Automated deployment to Netlify

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
