import React, { useState, useEffect } from 'react';
import {
    Play,
    Palette,
    Code,
    Zap,
    Eye,
    Settings,
    Star,

    CheckCircle,
    Sparkles,
    Github,

    FileText,
    Move3D
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Palette size={32} />,
            title: "Rich Customization",
            description: "Color pickers, typography controls, and advanced styling options"
        },
        {
            icon: <Code size={32} />,
            title: "Live Preview",
            description: "See your changes instantly with real-time preview capabilities"
        },
        {
            icon: <Zap size={32} />,
            title: "Multiple Components",
            description: "Buttons, cards, forms, images, and more CTA components"
        }
    ];

    const components = [
        "Title Editor", "Button Editor", "Card Editor", "Form Editor",
        "Image Editor", "Paragraph Editor", "Tag Editor", "Others Editor"
    ];

    const customStyles = {
        gradientBg: {
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #e3f2fd 100%)'
        },
        gradientPrimary: {
            background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)',
            border: 'none'
        },
        gradientText: {
            background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 50%, #6610f2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        backdropBlur: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
        },
        heroCard: {
            background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)'
        },
        featureCard: {
            transition: 'all 0.3s ease',
            border: '1px solid #e9ecef'
        },
        featureCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 25px rgba(0,123,255,0.15)'
        },
        componentCard: {
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        },
        techCard: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            transition: 'all 0.3s ease'
        },
        ctaSection: {
            background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 50%, #6610f2 100%)'
        }
    };

    return (
      <>
        {/* Custom CSS for additional styling */}
        <style jsx>{`
          .navbar-custom {
            background-color: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #e9ecef;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 123, 255, 0.15);
          }

          .component-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .tech-card:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .icon-bounce:hover {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }

          .btn-gradient {
            background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
            border: none;
            transition: all 0.3s ease;
          }

          .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
          }

          .progress-animated {
            width: 0%;
            transition: width 1s ease-in-out;
          }

          .progress-animated.animate {
            width: 85%;
          }

          @media (max-width: 768px) {
            .display-1 {
              font-size: 3rem;
            }
          }
        `}</style>

        <div style={customStyles.gradientBg}>
          {/* Navigation */}
          <nav className="navbar navbar-expand-md navbar-light fixed-top navbar-custom">
            <div className="container d-flex justify-content-between align-items-center">
              {/* Left Side: Brand */}
              <div className="navbar-brand d-flex align-items-center mb-0">
                <span
                  className="fw-bold fs-4"
                  style={customStyles.gradientText}
                >
                  Dynamic CTA creator
                </span>
              </div>

              {/* Right Side: Button */}
              <div
                className={`collapse navbar-collapse justify-content-end ${
                  isMenuOpen ? "show" : ""
                }`}
              >
                <button
                  className="btn btn-gradient text-white px-4 py-2"
                  onClick={() => navigate("/cta-editor")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="pt-5 pb-5" style={{ marginTop: "80px" }}>
            <div className="container">
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill mb-4">
                  <Star size={16} className="me-2" />
                  <small className="fw-medium">Professional CTA Builder</small>
                </div>

                <h1 className="display-1 fw-bold mb-4">
                  <span style={customStyles.gradientText}>Create Stunning</span>
                  <br />
                  <span className="text-dark">Call-to-Actions</span>
                </h1>

                <p
                  className="lead text-muted mb-5 mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  A powerful React-based tool for designing and customizing
                  beautiful CTA components with rich editing options, live
                  preview, and professional templates.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button
                    onClick={() => navigate("/cta-editor")}
                    className="btn btn-gradient text-white px-4 py-3 fw-semibold d-flex align-items-center justify-content-center"
                  >
                    <Play size={20} className="me-2" />
                    Start Building
                  </button>
                  <button className="btn btn-outline-secondary px-4 py-3 fw-semibold d-flex align-items-center justify-content-center">
                    <Github size={20} className="me-2" />
                    View on GitHub
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-5 bg-white">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="display-4 fw-bold text-dark mb-3">
                  Powerful Features
                </h2>
                <p
                  className="lead text-muted mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  Everything you need to create professional CTAs with advanced
                  customization and real-time preview
                </p>
              </div>

              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div
                    className="card h-100 border feature-card"
                    style={customStyles.featureCard}
                  >
                    <div className="card-body p-4">
                      <div className="bg-primary bg-opacity-10 rounded p-3 d-inline-flex mb-4 icon-bounce">
                        <Palette size={24} className="text-primary" />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-3">
                        Rich Text Editing
                      </h3>
                      <p className="text-muted mb-3">
                        Integrated advanced formatting options and HTML parsing
                        support
                      </p>
                      <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Advanced text formatting
                          </small>
                        </li>
                        <li className="d-flex align-items-center">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            HTML parsing support
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="card h-100 border feature-card"
                    style={customStyles.featureCard}
                  >
                    <div className="card-body p-4">
                      <div className="bg-secondary bg-opacity-10 rounded p-3 d-inline-flex mb-4 icon-bounce">
                        <Settings size={24} className="text-secondary" />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-3">
                        Customization Options
                      </h3>
                      <p className="text-muted mb-3">
                        Complete control over colors, borders, margin,
                        positioning, and typography
                      </p>
                      <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Color picker with opacity
                          </small>
                        </li>
                        <li className="d-flex align-items-center">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Bootstrap integration
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="card h-100 border feature-card"
                    style={customStyles.featureCard}
                  >
                    <div className="card-body p-4">
                      <div className="bg-success bg-opacity-10 rounded p-3 d-inline-flex mb-4 icon-bounce">
                        <Eye size={24} className="text-success" />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-3">
                        Live Preview
                      </h3>
                      <p className="text-muted mb-3">
                        See your changes instantly with CardPreview and
                        interactive components
                      </p>
                      <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Real-time updates
                          </small>
                        </li>
                        <li className="d-flex align-items-center">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Interactive dropdowns
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="card h-100 border feature-card"
                    style={customStyles.featureCard}
                  >
                    <div className="card-body p-4">
                      <div className="bg-info bg-opacity-10 rounded p-3 d-inline-flex mb-4 icon-bounce">
                        <Move3D size={24} className="text-" />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-3">
                        Bootstrap Class Generator
                      </h3>
                      <p className="text-muted mb-3">
                        A visual controller that lets you generating clean and
                        responsive Bootstrap 5 class.
                      </p>
                      <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Auto-generate Bootstrap 5 classes
                          </small>
                        </li>
                        <li className="d-flex align-items-center">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Live preview and exportable code
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="card h-100 border feature-card"
                    style={customStyles.featureCard}
                  >
                    <div className="card-body p-4">
                      <div className="bg-primary bg-opacity-10 rounded p-3 d-inline-flex mb-4 icon-bounce">
                        <Sparkles size={24} className="text-primary" />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-3">
                        AI-Powered CTA Generator
                      </h3>
                      <p className="text-muted mb-3">
                        Instantly generate high-converting CTA cards with AI in
                        just one click.
                      </p>
                      <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            ChatGPT & Gemini integration
                          </small>
                        </li>
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            One-click CTA creation
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div
                    className="card h-100 border feature-card"
                    style={customStyles.featureCard}
                  >
                    <div className="card-body p-4">
                      <div className="bg-primary bg-opacity-10 rounded p-3 d-inline-flex mb-4 icon-bounce">
                        <FileText size={24} className="text-primary" />
                      </div>
                      <h3 className="h5 fw-bold text-dark mb-3">Form Editor</h3>
                      <p className="text-muted mb-3">
                        Capture user input and send it directly to your backend
                        via API.
                      </p>
                      <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            Live JSON-based editing interface
                          </small>
                        </li>
                        <li className="d-flex align-items-center">
                          <CheckCircle
                            size={16}
                            className="text-success me-2"
                          />
                          <small className="text-muted">
                            API integration for form submission
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Components Section */}
          <section
            id="components"
            className="py-5"
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)",
            }}
          >
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="display-4 fw-bold text-dark mb-3">
                  8 Powerful Components
                </h2>
                <p
                  className="lead text-muted mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  Each component comes with rich customization options and live
                  preview capabilities
                </p>
              </div>

              <div className="row g-4">
                {components.map((component, index) => (
                  <div key={index} className="col-lg-3 col-md-6">
                    <div
                      className="card h-100 border-0 shadow-sm component-card"
                      style={customStyles.componentCard}
                    >
                      <div className="card-body p-4">
                        <div
                          className="p-2 rounded d-inline-flex mb-3"
                          style={customStyles.gradientPrimary}
                        >
                          <span className="text-white fw-bold small">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="h6 fw-bold text-dark mb-2">
                          {component}
                        </h3>
                        <p className="text-muted small mb-3">
                          Customize and preview in real-time
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-5 text-white" style={customStyles.ctaSection}>
            <div className="container">
              <div className="text-center">
                <h2 className="display-4 fw-bold mb-4">
                  Ready to Build Amazing CTAs?
                </h2>
                <p
                  className="lead mb-5 mx-auto"
                  style={{ maxWidth: "600px", opacity: "0.9" }}
                >
                  Empowering developers to design stunning, interactive CTAs —
                  faster and smarter with React.
                </p>

                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div className="text-center me-4">
                      <div className="h2 fw-bold">8+</div>
                      <div className="small" style={{ opacity: "0.8" }}>
                        Components
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="text-center me-4">
                      <div className="h2 fw-bold">∞</div>
                      <div className="small" style={{ opacity: "0.8" }}>
                        Customizations
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="text-center">
                      <div className="h2 fw-bold">100%</div>
                      <div className="small" style={{ opacity: "0.8" }}>
                        Open Source
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
};

export default LandingPage;