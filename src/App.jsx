import HeroScene from "./components/HeroScene";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedCounter from "./components/AnimatedCounter";
import emailjs from "@emailjs/browser";
import { div } from "framer-motion/client";
import { motion, AnimatePresence } from "framer-motion";
import AICoach from "./components/AICoach";

function App() {
const [loading, setLoading] = useState(true);
const [menuOpen, setMenuOpen] = useState(false);
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [bmi, setBmi] = useState("");
const [aiOpen, setAiOpen] = useState(false);
const [showTitan, setShowTitan] = useState(false);
const hasSpoken = useRef(false);
const welcomeAudio = useRef(null);
const [scrollProgress, setScrollProgress] = useState(0);
const [scrolled, setScrolled] = useState(false);
const [counterTrigger, setCounterTrigger] = useState(0);
const [plan, setPlan] = useState("");
const [diet, setDiet] = useState("");
const [expandedProgram, setExpandedProgram] = useState(null);
const [name, setName] = useState("");
const [selectedTrainer, setSelectedTrainer] = useState(null);
const [selectedMembership, setSelectedMembership] = useState(null);
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [subject, setSubject] = useState("");

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });

  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);


useEffect(() => {
  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = (window.scrollY / totalHeight) * 100;

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 80);

    const about = document.getElementById("about");

    if (!about) return;

    const aboutTop = about.offsetTop;

    // About section ke paas pahunchte hi Titan show
    if (window.scrollY >= aboutTop - 150) {
      setShowTitan(true);

      // Welcome audio sirf first time
      if (
        !hasSpoken.current &&
        welcomeAudio.current &&
        audioUnlocked
      ) {
        hasSpoken.current = true;

        welcomeAudio.current.pause();
        welcomeAudio.current.currentTime = 0;
        welcomeAudio.current.volume = 1;

        welcomeAudio.current.load();

        welcomeAudio.current.oncanplaythrough = () => {
          welcomeAudio.current.play().catch((err) => {
            console.log("Audio Error:", err);
          });
        };
      }
    } else {
      // About ke upar jaate hi Titan hide
      setShowTitan(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Page load par initial position check
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
const calculateBMI = () => {
  if (!height || !weight) {
    setBmi("");
    return;
  }

  const h = height / 100;
  const result = (weight / (h * h)).toFixed(1);

  setBmi(result);
};

  const sendEmail = (e) => {
  e.preventDefault();

  emailjs.send(
  "service_q84utsn",
  "template_kqxpayi",
  {
    name,
    email,
    subject,
    message,
  },
  "FphHgpoiuO-97e6ea"
)
    .then(() => {
      alert("Message Sent Successfully ✅");

      setName("");
      setEmail("");
      setMessage("");
    })
    .catch((error) => {
      alert("Failed to send message ❌");
      console.log(error);
    });
};

  if (loading) {
    return (
      <div className="loader">

        <div className="loader-circle"></div>

        <h1>Aman Singh Fitness</h1>

        <p>Transform Your Body</p>

      </div>
    );
  } 

    return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
   >
    
      <div
      className="scroll-progress"
     style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="circle1"></div>
      <div className="circle2"></div>

      <nav className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <h2 className="logo">
      <span>Aman</span> FitPro
     </h2>

  <div
    className="hamburger"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </div>

        <div className={menuOpen ? "menu active" : "menu"}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="join-btn">
        Join Now
        </button>
       </nav>

      <section className="hero" id="home">
  <div className="hero-overlay"></div>
  <div className="hero-particles">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

  <div className="hero-content">
    {/* Left Side */}
    <div className="hero-left">
      <span className="hero-badge">
        🔥 India's Premium Fitness Platform
      </span>

      <h1 className="hero-title">
      BE STRONG <br />
      <span>BE BETTER</span>
     </h1>

      <p className="hero-description">
      Transform Your Body.<br />
      Transform Your Life.
     </p>

      <div className="hero-buttons">

  {/* START WORKOUT → PROGRAMS */}
  <button
    className="primary-btn"
    onClick={() => {
      document
        .getElementById("programs")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
  >
    Start Workout
  </button>

  {/* ARROW → AI COACH */}
  <button
    className="secondary-btn"
    onClick={() => {
      document
        .getElementById("about")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    aria-label="Open AI Coach"
  >
    →
  </button>

</div>
    </div>
 

    {/* Right Side */}
   <div className="hero-right">
   <div className="hero-ring"></div>
   <div className="hero-ring2"></div>
   <div className="hero-ring3"></div>
   <div className="hero-stars"></div>
   <div className="hero-nebula"></div>
   <div className="smoke smoke1"></div>
   <div className="smoke smoke2"></div>
   <div className="smoke smoke3"></div>
   <div className="hero-glow"></div>

   <div className="light-ray ray1"></div>
   <div className="light-ray ray2"></div>
   <div className="light-ray ray3"></div>

   <div className="hero-character-placeholder">
   <div className="hero-character-bg"></div>

  <HeroScene />

  <div className="hero-shadow"></div>
</div>
  </div>
 </div>

  {/* Bottom Stats */}
  <div className="hero-stats">
    <div className="hero-stat glass">
      <h3>500+</h3>
      <p>Active Members</p>
    </div>

    <div className="hero-stat glass">
      <h3>100+</h3>
      <p>Workout Plans</p>
    </div>

    <div className="hero-stat glass">
      <h3>24/7</h3>
      <p>AI Fitness Coach</p>
    </div>

    <div className="hero-stat glass">
      <h3>50+</h3>
      <p>Body Transformations</p>
    </div>
  </div>
</section>

        <motion.section
         className="about"
         id="about"
         data-aos="fade-up"
         
        >
        <h2>About Me</h2>

        <p>
          Welcome to Aman Singh Fitness. My mission is to help people build
          strength, confidence, and a healthy lifestyle through proper workout
          plans and nutrition guidance.
        </p>

        <div className="about-boxes">
          <div className="box glass">
            <h3>100+</h3>
            <p>Workout Plans</p>
          </div>

          <div className="box glass">
            <h3>500+</h3>
            <p>Happy Members</p>
          </div>

          <div className="box glass">
            <h3>24/7</h3>
            <p>Online Support</p>
          </div>
        </div>

         </motion.section>

        <section
        className="programs"
        id="programs"
        data-aos="zoom-in"
       >
  <h2>Our Programs</h2>

  <div className="program-cards">

  {/* ==============================
      STRENGTH TRAINING
      ============================== */}

  <div className="card glass">

    <div className="icon-circle">💪</div>

    <h3>Strength Training</h3>

    <p>
      Build muscle and increase power.
    </p>

    <button
      className="card-btn"
      onClick={() =>
        setExpandedProgram(
          expandedProgram === "strength"
            ? null
            : "strength"
        )
      }
    >
      {expandedProgram === "strength"
        ? "Close ↑"
        : "Explore →"}
    </button>

    {expandedProgram === "strength" && (
      <div className="program-details">

        <h4>💪 Strength Training Plan</h4>

        <p>
          Build strength, muscle and overall
          physical performance.
        </p>

        <ul>
          <li>🏋️ Chest + Triceps</li>
          <li>💪 Back + Biceps</li>
          <li>🦵 Legs</li>
          <li>🔥 Shoulders</li>
          <li>⚡ Full Body</li>
        </ul>

        <div className="program-meta">
          <span>⏱️ 45–60 Min</span>
          <span>🎯 Muscle Gain</span>
        </div>

        <button
          className="program-start-btn"
          onClick={() => {
            setPlan("muscle");

            document
              .querySelector(".workout-planner")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        >
          Start Muscle Plan →
        </button>

      </div>
    )}

  </div>


  {/* ==============================
      FAT LOSS
      ============================== */}

  <div className="card glass">

    <div className="icon-circle">🔥</div>

    <h3>Fat Loss</h3>

    <p>
      Burn calories and stay fit.
    </p>

    <button
      className="card-btn"
      onClick={() =>
        setExpandedProgram(
          expandedProgram === "fat"
            ? null
            : "fat"
        )
      }
    >
      {expandedProgram === "fat"
        ? "Close ↑"
        : "Explore →"}
    </button>

    {expandedProgram === "fat" && (
      <div className="program-details">

        <h4>🔥 Fat Loss Plan</h4>

        <p>
          Improve fitness, burn calories and
          build a healthier routine.
        </p>

        <ul>
          <li>🏃 Cardio Training</li>
          <li>🔥 HIIT Workout</li>
          <li>💪 Full Body Workout</li>
          <li>🧘 Recovery & Stretching</li>
          <li>🥗 Balanced Nutrition</li>
        </ul>

        <div className="program-meta">
          <span>⏱️ 30–45 Min</span>
          <span>🎯 Fat Loss</span>
        </div>

        <button
          className="program-start-btn"
          onClick={() => {
            setPlan("fat");

            document
              .querySelector(".workout-planner")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        >
          Start Fat Loss Plan →
        </button>

      </div>
    )}

  </div>


  {/* ==============================
      NUTRITION
      ============================== */}

  <div className="card glass">

    <div className="icon-circle">🥗</div>

    <h3>Nutrition Plan</h3>

    <p>
      Healthy diet plans for better results.
    </p>

    <button
      className="card-btn"
      onClick={() =>
        setExpandedProgram(
          expandedProgram === "nutrition"
            ? null
            : "nutrition"
        )
      }
    >
      {expandedProgram === "nutrition"
        ? "Close ↑"
        : "Explore →"}
    </button>

    {expandedProgram === "nutrition" && (
      <div className="program-details">

        <h4>🥗 Nutrition Plan</h4>

        <p>
          Choose a diet style and build a
          structured nutrition routine.
        </p>

        <ul>
          <li>🍳 Breakfast Planning</li>
          <li>🍛 Lunch Planning</li>
          <li>🥜 Healthy Snacks</li>
          <li>🌙 Dinner Planning</li>
          <li>💧 Daily Hydration</li>
        </ul>

        <div className="program-meta">
          <span>🔥 Calories</span>
          <span>🥩 Protein</span>
        </div>

        <button
          className="program-start-btn"
          onClick={() => {
            document
              .querySelector(".diet-section")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        >
          Generate Diet Plan →
        </button>

      </div>
    )}

  </div>

</div>
  </section>
  <section
  className="trainers"
  data-aos="zoom-in"
>

<h2>Meet Our Trainers</h2>

<div className="trainer-container">

<div className="trainer-card">

<img
  src="/images/aman-singh.png"
  alt="Aman Singh"
/>

<h3>Aman Singh</h3>

<p>Certified Fitness Coach</p>

<span>Muscle Gain • Fat Loss • Diet Plans</span>

<span>⭐ 3+ Years Experience</span>

<button
  className="trainer-btn"
  onClick={() =>
    setSelectedTrainer("aman")
  }
>
  View Profile →
</button>

</div>

<div className="trainer-card">

<img
  src="/images/rakesh.jpeg"
  alt="Rakesh Paswan"
/>
<h3>Rakesh Paswan</h3>

<p>Certified Fitness Coach</p>

<span>Muscle Gain • Fat Loss • Diet Plans</span>

<span>⭐ 6+ Years Experience</span>

<button
  className="trainer-btn"
  onClick={() =>
    setSelectedTrainer("rakesh")
  }
>
  View Profile →
</button>

</div>
</div>

</section>

<section className="transformations" data-aos="fade-up">

  <h2>Client Transformations</h2>
  <p>Real Results. Real People.</p>

  <div className="transformation-container">

    <div className="transformation-card">
  <img src="/images/aman before.jpeg" alt="Before" />

  <img src="/images/aman.png" alt="After" />
  
      <h3>Aman</h3>
      <span>Gained 9 KG Muscle in 1 months</span>
    </div>

    <div className="transformation-card">
      <img src="/images/harsh before.jpeg" alt="Before" />
      <img src="/images/harsh after.jpeg" alt="After" />

      <h3>Harsh</h3>
      <span>Lost 18 KG in 4 Months</span>
    </div>

    <div className="transformation-card">
      <img src="/images/sujal before.jpeg" alt="Before" />
      <img src="/images/sujal after.jpeg" alt="After" />

      <h3>Swaniz</h3>
      <span>Body Recomposition</span>
    </div>

  </div>

</section>

<section className="testimonials">

<h2>WHAT OUR CLIENTS SAY ❤️</h2>

<div className="testimonial-container">

<div className="testimonial-card glass">

<h3>⭐⭐⭐⭐⭐</h3>

<p>
Best fitness coaching I've ever joined.
Amazing workout plans and diet support.
</p>

<h4>Harsh</h4>

<p className="result">
  ⬇️ Lost 18 KG
</p>

</div>


<div className="testimonial-card glass">

<h3>⭐⭐⭐⭐⭐</h3>

<p>
Highly recommended.
I lost 12kg in just 4 months.
</p>

<h4>Ujjwal Sharma</h4>
<p className="result">
💪 Gained 8 KG Muscle
</p>
</div>


<div className="testimonial-card glass">

<h3>⭐⭐⭐⭐⭐</h3>

<p>
Very professional trainers and
excellent guidance.
</p>

<h4>Santosh Kumar</h4>
<p className="result">
🔥 Body Recomposition
</p>

</div>

</div>

</section>
<section
  className="pricing"
  data-aos="fade-up"
>

<h2>Membership Plans</h2>

<div className="pricing-container">

<div className="price-card glass">

<h3>Basic</h3>

<h1>₹99</h1>

<p>Per Month</p>

<ul>
<li>✔️ Workout Plans</li>
<li>✔️ Nutrition Tips</li>
<li>✔️ Community Access</li>
</ul>

<button
  onClick={() =>
    setSelectedMembership({
      name: "Basic",
      price: "₹99",
    })
  }
>
  Join Now
</button>

</div>


<div className="price-card premium glass">

<h3>Premium</h3>

<h1>₹149</h1>

<p>Per Month</p>

<ul>
<li>✔️ Personal Coach</li>
<li>✔️ Diet Plans</li>
<li>✔️ Video Sessions</li>
<li>✔️ 24/7 Support</li>
</ul>

<button
  onClick={() =>
    setSelectedMembership({
      name: "Premium",
      price: "₹149",
    })
  }
>
  Join Now
</button>

</div>



<div className="price-card glass">

<h3>Elite</h3>

<h1>₹199</h1>

<p>Per Month</p>

<ul>
<li>✔️ 1-on-1 Training</li>
<li>✔️ Custom Plans</li>
<li>✔️ Priority Support</li>
<li>✔️ Lifetime Community</li>
</ul>

<button
  onClick={() =>
    setSelectedMembership({
      name: "Elite",
      price: "₹199",
    })
  }
>
  Join Now
</button>

</div>

</div>

</section>

{/* =====================================================
    MEMBERSHIP JOIN MODAL
    ===================================================== */}

<AnimatePresence>
  {selectedMembership && (
    <motion.div
      className="membership-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedMembership(null)}
    >

      <motion.div
        className="membership-modal"
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.85,
          y: 30,
        }}
        transition={{
          duration: 0.3,
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}

        <button
          className="membership-modal-close"
          onClick={() =>
            setSelectedMembership(null)
          }
          aria-label="Close"
        >
          ×
        </button>


        {/* HEADER */}

        <div className="membership-modal-header">

          <span className="membership-icon">
            🏋️
          </span>

          <h2>
            Join {selectedMembership.name}
          </h2>

          <div className="membership-price">
            {selectedMembership.price}
            <small> / Month</small>
          </div>

          <p>
            Start your fitness journey with
            Aman FitPro.
          </p>

        </div>


        {/* FORM */}

        <div className="membership-form">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <div className="selected-plan-box">

            <span>
              Selected Plan
            </span>

            <strong>
              {selectedMembership.name}
            </strong>

            <b>
              {selectedMembership.price}/month
            </b>

          </div>


          {/* CONTINUE */}

          <button
            className="membership-continue-btn"
            onClick={() => {

              if (!name.trim()) {
                alert("Please enter your name.");
                return;
              }

              if (!email.trim()) {
                alert("Please enter your email.");
                return;
              }

              if (!phone.trim()) {
                alert("Please enter your phone number.");
                return;
              }

              setSubject(
                `Membership Request - ${selectedMembership.name}`
              );

              setMessage(
                `I want to join the ${selectedMembership.name} membership plan (${selectedMembership.price}/month).

Name: ${name}
Email: ${email}
Phone: ${phone}`
              );

              setSelectedMembership(null);

              setTimeout(() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }, 150);

            }}
          >
            Continue →
          </button>

        </div>

        <p className="membership-note">
          🔒 Your details are used only for
          membership enquiry.
        </p>

      </motion.div>

    </motion.div>
  )}
</AnimatePresence>

<section className="faq">

<h2>Frequently Asked Questions</h2>

<div className="faq-container">

<div className="faq-item">
<h3>🏋️ Do you provide a diet plan?</h3>
<p>
Yes. Every member receives a personalized diet plan
based on their fitness goal.
</p>
</div>

<div className="faq-item">
<h3>💪 Can beginners join?</h3>
<p>
Absolutely. Our programs are designed for beginners,
intermediate, and advanced members.
</p>
</div>

<div className="faq-item">
<h3>🔥 How long does body transformation take?</h3>
<p>
Most clients notice visible results within
8-12 weeks with proper training and nutrition.
</p>
</div>

<div className="faq-item">
<h3>📅 Do you offer personal training?</h3>
<p>
Yes. One-to-one personal coaching is available
both online and offline.
</p>
</div>

</div>

</section>

<section
  className="gallery"
  id="gallery"
  data-aos="fade-left"
>
  <h2>Gallery</h2>

  <div className="gallery-container">

    <div className="gallery-item">
  <img
    src="/images/photo1.png"
    alt="Gym Workout"
    loading="lazy"
  />
</div>

    <div className="gallery-item">
  <img
    src="/images/photo2.png"
    alt="Fitness Training"
  />
</div>

   <div className="gallery-item">
  <img
    src="/images/photo3.png"
    alt="Gym Session"
  />
</div>

  <div className="gallery-item">
  <img
    src="/images/photo4.png"
    alt="Workout Exercise"
  />
</div>

  </div>
</section>
<section
  className="stats"
  data-aos="zoom-in"
>

<h2>Our Achievements</h2>

<div className="stats-container">

<div
  className="stat-card glass"
  onMouseEnter={() => setCounterTrigger(prev => prev + 1)}
>
<div className="stat-icon">💪</div>
<h1>
    <AnimatedCounter
    end={100}
    trigger={counterTrigger}
    />
    +
</h1>
<p>Workout Plans</p>
</div>

<div
  className="stat-card glass"
  onMouseEnter={() => setCounterTrigger(prev => prev + 1)}
>
<div className="stat-icon">👥</div>  
<h1>
  <AnimatedCounter 
  end={500} 
  trigger={counterTrigger} 
  />
  +
</h1>
<p>Happy Members</p>
</div>

<div
  className="stat-card glass"
  onMouseEnter={() => setCounterTrigger(prev => prev + 1)}
>
<div className="stat-icon">🔥</div>  
<h1>
  <AnimatedCounter
  end={50}
  trigger={counterTrigger}
  />
  +
</h1>
<p>Body Transformations</p>
</div>

<div className="stat-card glass">
  <div className="stat-icon">🎯</div>
  <h1>1-on-1</h1>
  <p>Personal Coaching</p>
</div>

</div>

</section>
<section className="exercises">

  <h2>Popular Exercises</h2>

  <div className="exercise-container">

    {/* Card 1 */}
    <div className="exercise-card glass">

      <span className="level beginner">Full Body</span>

      <img
        className="exercise-img"
        src="/images/full body.png"
        alt="Strength Training"
      />

      <h3>Strength Training</h3>

      <p>
        Chest • Back • Shoulders • Biceps • Triceps • Legs
      </p>

      <div className="exercise-info">
        <span>💪 6 Muscle Groups</span>
        <span>⏱️ 60 Min</span>
      </div>

      <button className="exercise-btn">
        Watch Demo →
      </button>

    </div>

    {/* Card 2 */}
    <div className="exercise-card glass">

      <span className="level intermediate">Powerlifting</span>

      <img
        className="exercise-img"
        src="/images/weight lift.png"
        alt="Weight Lifting"
      />

      <h3>Weight Lifting</h3>

      <p>
        Deadlift • Bench Press • Squats • Overhead Press • Barbell Rows
      </p>

      <div className="exercise-info">
        <span>🏋️ Strength Focus</span>
        <span>⏱️ 45 Min</span>
      </div>

      <button className="exercise-btn">
        Watch Demo →
      </button>

    </div>

    {/* Card 3 */}
    <div className="exercise-card glass">

      <span className="level advanced">Cardio</span>

      <img
        className="exercise-img"
        src="/images/cardio.png"
        alt="Cardio"
      />

      <h3>Cardio Training</h3>

      <p>
        Running • Cycling • Jump Rope • HIIT • Treadmill
      </p>

      <div className="exercise-info">
        <span>❤️ Fat Burn</span>
        <span>⏱️ 30 Min</span>
      </div>

      <button className="exercise-btn">
        Watch Demo →
      </button>

    </div>

  </div>

</section>
<section className="bmi-section">

  <div className="bmi-card glass">

    <h2>BMI Calculator</h2>

    <input
      type="number"
      placeholder="Height (cm)"
      value={height}
      onChange={(e) => setHeight(e.target.value)}
    />

    <input
      type="number"
      placeholder="Weight (kg)"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />

    <button onClick={calculateBMI}>
      Calculate BMI
    </button>

    <h3>
      Your BMI: {bmi || "--"}
    </h3>

    {bmi && (
  <>
    <p className="bmi-result">
      {bmi < 18.5
        ? "🔵 Underweight"
        : bmi < 25
        ? "🟢 Normal Weight"
        : bmi < 30
        ? "🟠 Overweight"
        : "🔴 Obese"}
    </p>

    <p className="bmi-tip">
      {bmi < 18.5
        ? "Increase healthy calories and strength training."
        : bmi < 25
        ? "Great! Maintain your current lifestyle."
        : bmi < 30
        ? "Exercise regularly and follow a balanced diet."
        : "Consult a fitness coach and follow a healthy routine."}
    </p>
  </>
)}

  {bmi && (
  <div className="bmi-bar">
    <div
      className="bmi-fill"
      style={{
        width: `${Math.min((bmi / 40) * 100, 100)}%`,
      }}
    ></div>
  </div>
  )}

  </div>

</section>

<section className="workout-planner">

  <h2>Workout Planner</h2>

 <div className="planner-buttons">

  <button
    className={plan === "muscle" ? "active-plan" : ""}
    onClick={() => setPlan("muscle")}
  >
    💪 Build Muscle
  </button>

  <button
    className={plan === "fat" ? "active-plan" : ""}
    onClick={() => setPlan("fat")}
  >
    🔥 Lose Fat
  </button>

  <button
    className={plan === "fit" ? "active-plan" : ""}
    onClick={() => setPlan("fit")}
  >
    ⚡ Maintain Fitness
  </button>

</div>

  {plan === "muscle" && (
    <div className="plan-card glass">
      <h3>💪 Build Muscle Plan</h3>
      <p>Monday - Chest + Triceps</p>
      <p>Tuesday - Back + Biceps</p>
      <p>Wednesday - Legs</p>
      <p>Thursday - Shoulders</p>
      <p>Friday - Arms</p>
      <p>Saturday - Full Body</p>
      <p>Sunday - Rest</p>
    </div>
  )}

  {plan === "fat" && (
    <div className="plan-card glass">
      <h3>🔥 Fat Loss Plan</h3>
      <p>Monday - Cardio + Core</p>
      <p>Tuesday - Full Body Workout</p>
      <p>Wednesday - HIIT</p>
      <p>Thursday - Upper Body</p>
      <p>Friday - Lower Body</p>
      <p>Saturday - Cardio + Abs</p>
      <p>Sunday - Stretching</p>
    </div>
  )}

  {plan === "fit" && (
    <div className="plan-card glass">
      <h3>⚡ Fitness Maintenance Plan</h3>
      <p>Monday - Full Body</p>
      <p>Tuesday - Cardio</p>
      <p>Wednesday - Yoga</p>
      <p>Thursday - Strength</p>
      <p>Friday - Mobility</p>
      <p>Saturday - Outdoor Activity</p>
      <p>Sunday - Recovery</p>
    </div>
  )}

</section>

<section className="diet-section">

  <h2>Diet Plan Generator</h2>

  <div className="diet-buttons">

    <button onClick={() => setDiet("veg")}>
      🥗 Vegetarian
    </button>

    <button onClick={() => setDiet("nonveg")}>
      🍗 Non Vegetarian
    </button>

  </div>

  {diet === "veg" && (

    <div className="diet-card glass">

      <h3>🥗 Vegetarian Diet Plan</h3>

      <p>🍳 Breakfast : Oats + Milk + Banana</p>

      <p>🍛 Lunch : Rice + Dal + Paneer</p>

      <p>🥜 Snacks : Peanut Butter + Dry Fruits</p>

      <p>🌙 Dinner : Soya Chunks + Roti + Salad</p>

      <hr />

      <p>🔥 Calories : 2800 kcal</p>

      <p>🥩 Protein : 160 g</p>

      <p>💧 Water : 4 Litres</p>

    </div>

  )}

  {diet === "nonveg" && (

    <div className="diet-card glass">

      <h3>🍗 Non Vegetarian Diet Plan</h3>

      <p>🍳 Breakfast : Oats + 4 Eggs</p>

      <p>🍗 Lunch : Chicken Breast + Rice</p>

      <p>🥜 Snacks : Peanut Butter + Banana</p>

      <p>🌙 Dinner : Fish/Chicken + Roti</p>

      <hr />

      <p>🔥 Calories : 3000 kcal</p>

      <p>🥩 Protein : 190 g</p>

      <p>💧 Water : 4 Litres</p>

    </div>

  )}

</section>

<section
  className="contact"
  id="contact"
  data-aos="fade-up"
>

<h2>Contact Me</h2>

<p className="contact-subtitle">
Let's Build Your Dream Physique Together 💪
</p>

<div className="contact-info">

<div className="info-card glass">
<h3>📍 Address</h3>
<p>Dhanbad, Jharkhand, India</p>
</div>

<div className="info-card glass">
<h3>📧 Email</h3>
<p>akfitness1704@email.com</p>
</div>

<div className="info-card glass">
<h3>📱 Phone</h3>
<p>+91 9508462031</p>
</div>

</div>

<form className="contact-container" onSubmit={sendEmail}>

<input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>

<input
  type="email"
  placeholder="Your Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="text"
  placeholder="Subject"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
/>

<textarea
  placeholder="Write Your Message..."
  rows="6"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  required
></textarea>

<button type="submit" className="send-btn">
  🚀 Send Message
</button>

</form>

<div className="social-links">

<a href="#">📸 Instagram</a>

<a href="#">💼 LinkedIn</a>

<a href="#">💻 GitHub</a>

</div>

</section>

{/* =====================================================
    TRAINER PROFILE MODAL
    ===================================================== */}

<AnimatePresence>
  {selectedTrainer && (
    <motion.div
      className="trainer-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() =>
        setSelectedTrainer(null)
      }
    >

      <motion.div
        className="trainer-modal"
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.85,
          y: 30,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* CLOSE BUTTON */}

        <button
          className="trainer-modal-close"
          onClick={() =>
            setSelectedTrainer(null)
          }
          aria-label="Close trainer profile"
        >
          ×
        </button>


        {/* ================================
            AMAN PROFILE
            ================================ */}

        {selectedTrainer === "aman" && (
          <>
            <img
              src="/images/aman-singh.png"
              alt="Aman Singh"
              className="trainer-modal-img"
            />

            <div className="trainer-modal-content">

              <span className="trainer-modal-badge">
                🏋️ CERTIFIED FITNESS COACH
              </span>

              <h2>
                Aman Singh
              </h2>

              <p className="trainer-modal-role">
                Fitness Coach • Muscle Building
              </p>

              <div className="trainer-modal-experience">
                ⭐ 3+ Years Experience
              </div>

              <p>
                Helping people build strength,
                improve fitness and create a
                consistent healthy lifestyle
                through structured training and
                nutrition guidance.
              </p>

              <div className="trainer-skills">

                <span>💪 Muscle Gain</span>
                <span>🔥 Fat Loss</span>
                <span>🥗 Diet Plans</span>
                <span>🏋️ Strength Training</span>

              </div>

            </div>
          </>
        )}


        {/* ================================
            RAKESH PROFILE
            ================================ */}

        {selectedTrainer === "rakesh" && (
          <>
            <img
              src="/images/rakesh.jpeg"
              alt="Rakesh Paswan"
              className="trainer-modal-img"
            />

            <div className="trainer-modal-content">

              <span className="trainer-modal-badge">
                🏋️ CERTIFIED FITNESS COACH
              </span>

              <h2>
                Rakesh Paswan
              </h2>

              <p className="trainer-modal-role">
                Fitness Coach • Advanced Training
              </p>

              <div className="trainer-modal-experience">
                ⭐ 6+ Years Experience
              </div>

              <p>
                Experienced fitness coach focused
                on muscle gain, fat loss and
                structured training programs for
                long-term results.
              </p>

              <div className="trainer-skills">

                <span>💪 Muscle Gain</span>
                <span>🔥 Fat Loss</span>
                <span>🥗 Diet Plans</span>
                <span>🏋️ Strength Training</span>

              </div>

            </div>
          </>
        )}

      </motion.div>

    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showTitan && (
<motion.div
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 300, opacity: 0 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  style={{
    position: "fixed",
    right: "20px",
    bottom: "20px",
    width: "550px",      // Pehle nahi tha
    height: "450px",     // Pehle nahi tha
    overflow: "visible", // Bahut zaruri
    pointerEvents: "auto",
    zIndex: 9999,
  }}
>
  <AICoach />
</motion.div>
  )}
</AnimatePresence>

<footer className="footer">

<h2>Aman Singh Fitness</h2>

<p>
Transform Your Body • Transform Your Life
</p>

<div className="footer-links">

<a href="#">Home</a>

<a href="#">Programs</a>

<a href="#">Gallery</a>

<a href="#">Contact</a>

</div>


<p className="copy">

© 2026 Aman Singh Fitness

</p>

</footer>

    </motion.div>
  );
}

export default App;
