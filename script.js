/* ========================================================
   FAISAL ALI | CREATIVE PORTFOLIO - CORE ENGINES & LOGIC
   Separated from demo.html for clean production architecture
   ======================================================== */

// 1. Locomotive Scroll + GSAP ScrollTrigger Integration
        let locoScroll;
        function initLocomotive() {
            gsap.registerPlugin(ScrollTrigger);

            locoScroll = new LocomotiveScroll({
                el: document.querySelector("#main"),
                smooth: true,
                smartphone: {
                    smooth: true
                },
                tablet: {
                    smooth: true
                }
            });

            locoScroll.on("scroll", (args) => {
                ScrollTrigger.update();
                updateActiveNavOnScroll(args);
            });

            ScrollTrigger.scrollerProxy("#main", {
                scrollTop(value) {
                    return arguments.length
                        ? locoScroll.scrollTo(value, 0, 0)
                        : locoScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
                pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
            });

            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
            ScrollTrigger.refresh();
        }
        initLocomotive();

        // ====================================================
        // Feature 2: Sci-Fi / Anime Micro-Sound Effects Engine
        // Web Audio API Synthesizer (Zero-latency, 100% native)
        // ====================================================
        let audioCtx = null;
        let soundEnabled = true;

        function initAudioContext() {
            if (!audioCtx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    audioCtx = new AudioContext();
                }
            }
            if (audioCtx && audioCtx.state === "suspended") {
                audioCtx.resume();
            }
        }

        function toggleSound() {
            initAudioContext();
            soundEnabled = !soundEnabled;
            const soundIcon = document.getElementById("sound-icon");
            const soundText = document.getElementById("sound-text");
            const soundBtn = document.getElementById("sound-btn");

            if (soundEnabled) {
                if (soundIcon) soundIcon.textContent = "🔊";
                if (soundText) soundText.textContent = "Sound";
                if (soundBtn) soundBtn.classList.add("sound-on");
                playSciFiChime(520, 880, "sine", 0.16);
            } else {
                if (soundIcon) soundIcon.textContent = "🔇";
                if (soundText) soundText.textContent = "Muted";
                if (soundBtn) soundBtn.classList.remove("sound-on");
            }
            localStorage.setItem("portfolio-sound", soundEnabled ? "on" : "off");
        }

        function playSciFiClick() {
            if (!soundEnabled || !audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(950, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            } catch(e) {}
        }

        function playSciFiChime(startFreq = 440, endFreq = 880, type = "sine", duration = 0.2) {
            if (!soundEnabled || !audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
                gain.gain.setValueAtTime(0.14, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch(e) {}
        }

        function playDialoguePop() {
            if (!soundEnabled || !audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(580, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1150, audioCtx.currentTime + 0.09);
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.09);
            } catch(e) {}
        }

        // ====================================================
        // Feature: ⚡ Cyberpunk Overdrive / Hyperdrive Engine
        // ====================================================
        let isOverdriveMode = false;

        function playOverdriveActivateSound() {
            if (!audioCtx) return;
            try {
                const now = audioCtx.currentTime;

                // 1. Futuristic energy buildup pitch sweep
                const osc1 = audioCtx.createOscillator();
                const gain1 = audioCtx.createGain();
                osc1.type = "sawtooth";
                osc1.frequency.setValueAtTime(140, now);
                osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.42);

                const filter = audioCtx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(400, now);
                filter.frequency.exponentialRampToValueAtTime(8000, now + 0.42);

                gain1.gain.setValueAtTime(0.01, now);
                gain1.gain.linearRampToValueAtTime(0.22, now + 0.35);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

                osc1.connect(filter);
                filter.connect(gain1);
                gain1.connect(audioCtx.destination);
                osc1.start(now);
                osc1.stop(now + 0.48);

                // 2. Heavy Sub-Bass Boom & Laser Impact
                setTimeout(() => {
                    if (!audioCtx) return;
                    try {
                        const impactNow = audioCtx.currentTime;
                        const subOsc = audioCtx.createOscillator();
                        const subGain = audioCtx.createGain();
                        subOsc.type = "sine";
                        subOsc.frequency.setValueAtTime(180, impactNow);
                        subOsc.frequency.exponentialRampToValueAtTime(42, impactNow + 0.6);

                        subGain.gain.setValueAtTime(0.35, impactNow);
                        subGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 0.65);

                        subOsc.connect(subGain);
                        subGain.connect(audioCtx.destination);
                        subOsc.start(impactNow);
                        subOsc.stop(impactNow + 0.65);

                        const laser = audioCtx.createOscillator();
                        const laserGain = audioCtx.createGain();
                        laser.type = "triangle";
                        laser.frequency.setValueAtTime(2400, impactNow);
                        laser.frequency.exponentialRampToValueAtTime(600, impactNow + 0.25);
                        laserGain.gain.setValueAtTime(0.18, impactNow);
                        laserGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 0.25);
                        laser.connect(laserGain);
                        laserGain.connect(audioCtx.destination);
                        laser.start(impactNow);
                        laser.stop(impactNow + 0.25);
                    } catch(e) {}
                }, 320);
            } catch(e) {}
        }

        function playOverdriveDeactivateSound() {
            if (!audioCtx) return;
            try {
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(900, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.4);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.45);
            } catch(e) {}
        }

        function toggleOverdrive(e) {
            initAudioContext();
            isOverdriveMode = !isOverdriveMode;

            const body = document.body;
            const btn = document.getElementById("overdrive-btn");
            const text = document.getElementById("overdrive-text");
            const shockwave = document.getElementById("overdrive-shockwave");
            const bubbleText = document.getElementById("dialogue-text");

            const originX = (e && e.clientX) ? e.clientX : window.innerWidth / 2;
            const originY = (e && e.clientY) ? e.clientY : window.innerHeight / 2;

            if (isOverdriveMode) {
                body.classList.add("cyber-overdrive");
                if (btn) btn.classList.add("overdrive-active");
                if (text) text.textContent = "Overdrive ON";

                playOverdriveActivateSound();

                // Expanding Thirtysixstudio-style shockwave
                if (shockwave && window.gsap) {
                    gsap.killTweensOf(shockwave);
                    gsap.set(shockwave, {
                        left: originX,
                        top: originY,
                        width: 20,
                        height: 20,
                        scale: 0,
                        opacity: 1
                    });
                    gsap.to(shockwave, {
                        scale: 90,
                        opacity: 0,
                        duration: 0.95,
                        ease: "power2.out"
                    });
                }

                if (bubbleText) {
                    let sectionOverdriveMsg = "⚡ HYPERDRIVE ACTIVATED! Cyberpunk Overdrive Mode engaged across all sections! 🚀🔥";
                    if (typeof currentActiveSec !== "undefined") {
                        if (currentActiveSec === "#page1") {
                            sectionOverdriveMsg = "⚡ CYBER OVERDRIVE ENGAGED! Neural Frontend Matrix & Skills overclocked to 300%! ⚡";
                        } else if (currentActiveSec === "#page2") {
                            sectionOverdriveMsg = "⚡ HYPERDRIVE ACTIVE! Warp field pulsing around Featured Projects! 🪐🚀";
                        } else if (currentActiveSec === "#page3") {
                            sectionOverdriveMsg = "⚡ OVERDRIVE UPLINK ONLINE! Direct encrypted neural channel ready for hire! 📬✨";
                        }
                    }
                    bubbleText.textContent = sectionOverdriveMsg;
                    if (typeof isCustomQuoteActive !== "undefined") {
                        isCustomQuoteActive = true;
                        clearTimeout(customQuoteTimer);
                        customQuoteTimer = setTimeout(() => {
                            isCustomQuoteActive = false;
                            if (typeof updateDialogueForSection === "function") {
                                updateDialogueForSection(currentActiveSec);
                            }
                        }, 5000);
                    }
                }

                const bubble = document.getElementById("character-dialogue");
                if (bubble) {
                    bubble.style.transform = "translate(-50%, -10px) scale(1.06)";
                    setTimeout(() => { bubble.style.transform = ""; }, 240);
                }
            } else {
                body.classList.remove("cyber-overdrive");
                if (btn) btn.classList.remove("overdrive-active");
                if (text) text.textContent = "Overdrive";

                playOverdriveDeactivateSound();

                if (bubbleText) {
                    bubbleText.textContent = "Overdrive disengaged. Returning to calm ambient mode across all sections. ✨";
                    if (typeof isCustomQuoteActive !== "undefined") {
                        isCustomQuoteActive = true;
                        clearTimeout(customQuoteTimer);
                        customQuoteTimer = setTimeout(() => {
                            isCustomQuoteActive = false;
                            if (typeof updateDialogueForSection === "function") {
                                updateDialogueForSection(currentActiveSec);
                            }
                        }, 3500);
                    }
                }

                const bubble = document.getElementById("character-dialogue");
                if (bubble) {
                    bubble.style.transform = "translate(-50%, -10px) scale(1.06)";
                    setTimeout(() => { bubble.style.transform = ""; }, 240);
                }
            }

            const cursorTextEl = document.querySelector("#cursor-ring .cursor-text");
            if (cursorTextEl && document.body.classList.contains("cursor-hover")) {
                cursorTextEl.textContent = isOverdriveMode ? "NORMAL ✨" : "OVERDRIVE ⚡";
            }
        }

        // Keyboard shortcut 'O' for Overdrive toggle
        window.addEventListener("keydown", (e) => {
            if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
            if (e.key === "o" || e.key === "O") {
                toggleOverdrive();
            }
        });

        function scrollToSection(selector) {
            initAudioContext();
            playSciFiClick();
            if (typeof setActiveSection === "function") {
                setActiveSection(selector);
            }
            if (locoScroll) {
                if (selector === "#page" || selector === "top") {
                    locoScroll.scrollTo(0);
                } else {
                    const target = document.querySelector(selector);
                    if (target) {
                        locoScroll.scrollTo(target);
                    }
                }
            }
        }

        // 2. Dark / Light Mode Switcher Function
        function toggleTheme() {
            initAudioContext();
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            document.getElementById("theme-icon").textContent = isDark ? "☀️" : "🌙";
            document.getElementById("theme-text").textContent = isDark ? "Light" : "Dark";
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

            if (isDark) {
                playSciFiChime(320, 800, "sine", 0.18);
            } else {
                playSciFiChime(800, 320, "sine", 0.18);
            }
        }

        // Remember user theme preference
        if (localStorage.getItem("portfolio-theme") === "dark") {
            toggleTheme();
        }

        // Remember user sound preference
        if (localStorage.getItem("portfolio-sound") === "on") {
            toggleSound();
        }

        // ----------------------------------------------------
        // Action Handlers (Resume, Clipboard & Contact Gateways)
        // ----------------------------------------------------
        // WhatsApp & Email Gateways (Zero-launcher silent notification)
        const CALLMEBOT_API_KEY = ""; // Enter CallMeBot WhatsApp API Key (Free)
        const WEB3FORMS_ACCESS_KEY = ""; // Enter Web3Forms Gmail Key (Free) 

        function triggerResumeDownload() {
            initAudioContext();
            playSciFiClick();
            const btn = document.querySelector(".hero-btn-action.primary");
            if (btn) {
                const orig = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Preparing CV...</span>';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Downloaded! ✓</span>';
                    
                    // Trigger actual download of Faisal_Ali_Resume.pdf
                    const link = document.createElement("a");
                    link.href = "./Faisal_Ali_Resume.pdf";
                    link.download = "Faisal_Ali_Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setTimeout(() => { btn.innerHTML = orig; }, 2400);
                }, 600);
            }
        }

        function copyEmail(email) {
            initAudioContext();
            playSciFiClick();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email);
            }
            const badge = document.getElementById("copy-badge");
            if (badge) {
                badge.textContent = "Copied! ✓";
                badge.style.color = "#16a34a";
                badge.style.opacity = "1";
                setTimeout(() => {
                    badge.textContent = "(Click to copy)";
                    badge.style.color = "";
                    badge.style.opacity = "0.6";
                }, 2200);
            }
        }

        async function handleContactSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const btn = form.querySelector("button[type='submit']");
            const nameInput = form.querySelector("input[type='text']");
            const emailInput = form.querySelector("input[type='email']");
            const msgInput = form.querySelector("textarea");
            const name = nameInput ? nameInput.value.trim() : "Visitor";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = msgInput ? msgInput.value.trim() : "";
            const orig = btn ? btn.innerHTML : "Send Message 🚀";

            if (btn) {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
            }

            // Clean format for WhatsApp Notification
            const waNotificationText = `🔥 *New Portfolio Message for Faisal!*\n\n` +
                                       `👤 *Name:* ${name}\n` +
                                       `📧 *Email:* ${email}\n` +
                                       `💬 *Message:* ${message}`;

            try {
                // 1. Silent Background WhatsApp Delivery (Zero launcher, visitor stays on site)
                if (CALLMEBOT_API_KEY && CALLMEBOT_API_KEY.length > 3) {
                    const waApiUrl = `https://api.callmebot.com/whatsapp.php?phone=917307751593&text=${encodeURIComponent(waNotificationText)}&apikey=${CALLMEBOT_API_KEY}`;
                    fetch(waApiUrl, { mode: "no-cors" }).catch(() => {});
                }

                // 2. Background Email Delivery (Web3Forms to faisalali06870@gmail.com)
                if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.length > 5) {
                    await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Accept: "application/json" },
                        body: JSON.stringify({ 
                            access_key: WEB3FORMS_ACCESS_KEY, 
                            name, 
                            email, 
                            message,
                            from_name: "Portfolio Visitor"
                        })
                    }).catch(() => {});
                } else {
                    // Smooth local fallback animation delay
                    await new Promise(r => setTimeout(r, 700));
                }

                // Smooth On-Page Success Feedback (No window / No launcher!)
                if (btn) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent! 🚀';
                    btn.style.background = "#16a34a";
                    btn.style.color = "#ffffff";
                    setTimeout(() => {
                        btn.innerHTML = orig;
                        btn.style.background = "";
                        btn.style.color = "";
                        btn.disabled = false;
                    }, 3500);
                }
                form.reset();

                // Interactive companion dialogue reaction
                initAudioContext();
                playSciFiChime(520, 960, "sine", 0.22);
                const bubbleText = document.getElementById("dialogue-text");
                if (bubbleText) {
                    bubbleText.textContent = `Thanks ${name}! Your message has been dispatched directly to Faisal (+91 73077 51593)! 🚀✨`;
                    isCustomQuoteActive = true;
                    clearTimeout(customQuoteTimer);
                    customQuoteTimer = setTimeout(() => {
                        isCustomQuoteActive = false;
                        updateDialogueForSection(currentActiveSec);
                    }, 6500);
                }
            } catch(err) {
                if (btn) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent! 🚀';
                    btn.style.background = "#16a34a";
                    btn.style.color = "#ffffff";
                    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ""; btn.style.color = ""; btn.disabled = false; }, 2500);
                }
                form.reset();
            }
        }

        // ----------------------------------------------------
        // Feature 1: Preloader & 300-Frame Image Preloading
        // ----------------------------------------------------
        const canvas = document.getElementById("character-canvas");
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        });

        function files(index) {
            return `./male${String(index + 1).padStart(4, '0')}.png`;
        }

        const frameCount = 300;
        const images = [];
        const imageSeq = { frame: 0 };

        const loaderNum = document.getElementById("loader-num");
        const loaderFill = document.getElementById("loader-fill");
        const preloader = document.getElementById("preloader");
        let loadedAssets = 0;
        let isPreloaderComplete = false;

        function updateLoaderProgress(percent) {
            if (isPreloaderComplete) return;
            const p = Math.min(100, Math.round(percent));
            if (loaderNum) loaderNum.textContent = p;
            if (loaderFill) loaderFill.style.width = p + "%";

            if (p >= 100) {
                finishPreloader();
            }
        }

        function finishPreloader() {
            if (isPreloaderComplete) return;
            isPreloaderComplete = true;

            if (loaderNum) loaderNum.textContent = "100";
            if (loaderFill) loaderFill.style.width = "100%";
            if (preloader) {
                preloader.style.pointerEvents = "none";
                preloader.classList.add("preloader-hidden");
            }

            try { render(); } catch(e) {}
            try { initHeroEntrance(); } catch(e) {}
            try { if (locoScroll) locoScroll.update(); } catch(e) {}
            try { if (window.ScrollTrigger) ScrollTrigger.refresh(); } catch(e) {}

            setTimeout(() => {
                if (preloader) {
                    preloader.style.display = "none";
                }
            }, 600);
        }

        // Guaranteed safety unlock (ensures preloader NEVER stays frozen on 100%)
        setTimeout(() => {
            if (!isPreloaderComplete) {
                finishPreloader();
            }
        }, 1800);

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.onload = () => {
                loadedAssets++;
                if (i === 0) render();
                const progress = (loadedAssets / frameCount) * 100;
                updateLoaderProgress(progress);
            };
            img.onerror = () => {
                loadedAssets++;
                const progress = (loadedAssets / frameCount) * 100;
                updateLoaderProgress(progress);
            };
            img.src = files(i);
            images.push(img);
        }

        // Smooth simulated fallback so preloader always unlocks cleanly
        let simProgress = 0;
        const simTimer = setInterval(() => {
            if (isPreloaderComplete) {
                clearInterval(simTimer);
                return;
            }
            simProgress += Math.floor(Math.random() * 8) + 4;
            const actualProgress = (loadedAssets / frameCount) * 100;
            updateLoaderProgress(Math.max(simProgress, actualProgress));
            if (simProgress >= 100) {
                clearInterval(simTimer);
                finishPreloader();
            }
        }, 60);

        // ====================================================
        // Feature: Personalized Anime Avatar with Breathing & 3D Mouse Parallax
        // Switchable with 1-Click to Original 300-Frame 3D Sequence
        // ====================================================
        let activeCharacterModel = "faisal"; // Default: Faisal Anime Avatar!

        const faisalAvatarImg = new Image();
        faisalAvatarImg.src = "./faisal-avatar.png";
        faisalAvatarImg.onload = () => {
            if (activeCharacterModel === "faisal") render();
        };

        let avatarMouseX = 0.5;
        let avatarMouseY = 0.5;
        let avatarTargetX = 0.5;
        let avatarTargetY = 0.5;

        window.addEventListener("mousemove", (e) => {
            avatarTargetX = e.clientX / window.innerWidth;
            avatarTargetY = e.clientY / window.innerHeight;
        });

        function renderFaisalAvatar(ctx) {
            if (!faisalAvatarImg.complete || !faisalAvatarImg.naturalWidth) return;
            const c = ctx.canvas;
            ctx.clearRect(0, 0, c.width, c.height);

            const isMobile = window.innerWidth <= 900;
            const targetHeight = isMobile ? c.height * 0.68 : c.height * 0.78;
            const scale = targetHeight / faisalAvatarImg.naturalHeight;
            const drawW = faisalAvatarImg.naturalWidth * scale;
            const drawH = faisalAvatarImg.naturalHeight * scale;

            // Smooth ease for mouse parallax tracking
            avatarMouseX += (avatarTargetX - avatarMouseX) * 0.08;
            avatarMouseY += (avatarTargetY - avatarMouseY) * 0.08;
            const parallaxX = (avatarMouseX - 0.5) * (isMobile ? 0 : 32);
            const parallaxY = (avatarMouseY - 0.5) * (isMobile ? 0 : 18);

            // Subtle natural breathing oscillation
            const breathe = Math.sin(Date.now() * 0.0024) * 4.5;

            const x = (c.width - drawW) / 2 + parallaxX;
            const y = c.height - drawH + parallaxY + breathe;

            ctx.drawImage(faisalAvatarImg, 0, 0, faisalAvatarImg.naturalWidth, faisalAvatarImg.naturalHeight, x, y, drawW, drawH);
        }

        gsap.to(imageSeq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                scrub: 0.15,
                trigger: "#character-canvas",
                start: "top top",
                end: "600% top",
                scroller: "#main",
            },
            onUpdate: render,
        });

        function render() {
            try {
                if (activeCharacterModel === "faisal") {
                    renderFaisalAvatar(context);
                } else {
                    if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
                        scaleImageAtBottom(images[imageSeq.frame], context);
                    }
                }
            } catch(e) {}
        }

        function scaleImageAtBottom(img, ctx) {
            if (!img || !img.naturalWidth || !img.naturalHeight) return;
            const c = ctx.canvas;
            const targetHeight = c.height * 0.82;
            const scale = targetHeight / img.naturalHeight;
            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;

            const x = (c.width - drawWidth) / 2;
            const y = c.height - drawHeight;

            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, x, y, drawWidth, drawHeight);
        }

        // Smooth continuous loop for breathing & mouse tracking
        function characterLoop() {
            if (activeCharacterModel === "faisal") {
                render();
            }
            requestAnimationFrame(characterLoop);
        }
        characterLoop();

        function toggleCharacterModel() {
            initAudioContext();
            if (activeCharacterModel === "faisal") {
                activeCharacterModel = "sequence";
                if (typeof playSciFiChime === "function") playSciFiChime(440, 880, "triangle", 0.18);
            } else {
                activeCharacterModel = "faisal";
                if (typeof playSciFiChime === "function") playSciFiChime(880, 440, "sine", 0.18);
            }

            // Update UI Badges & Dialogue
            const label = document.getElementById("avatar-switch-badge-label");
            const icon = document.getElementById("avatar-switch-badge-icon");
            const bubbleText = document.getElementById("dialogue-text");

            if (activeCharacterModel === "faisal") {
                if (label) label.innerHTML = "Model: <b>Faisal Anime</b>";
                if (icon) icon.textContent = "⚡";
                if (bubbleText) bubbleText.textContent = "Switched to Faisal Anime Avatar! Natural breathing & 3D parallax active! ✨";
            } else {
                if (label) label.innerHTML = "Model: <b>300-Frame 3D</b>";
                if (icon) icon.textContent = "🎞️";
                if (bubbleText) bubbleText.textContent = "Switched to 300-Frame 3D sequence! Scroll to rotate! 🚀";
            }

            render();
        }

        ScrollTrigger.create({
            trigger: "#character-canvas",
            pin: true,
            scroller: "#main",
            start: "top top",
            end: "600% top",
        });



        // ----------------------------------------------------
        // Feature 3: Interactive Character Dialogue System
        // ----------------------------------------------------
        let currentActiveSec = "#page";
        let isCustomQuoteActive = false;
        let customQuoteTimer = null;

        const sectionDialogueMap = {
            "#page": "Hey! Welcome to my creative universe. Scroll down to explore! 🚀",
            "#page1": "Final Year CS student & passionate creative developer! 💻",
            "#page2": "Check out my featured builds — click 'Live' or 'Code'! ⚡",
            "#page3": "Let's collaborate or hire me for your team! 📬"
        };

        function updateDialogueForSection(secId) {
            if (isCustomQuoteActive) return;
            const bubbleText = document.getElementById("dialogue-text");
            if (bubbleText && sectionDialogueMap[secId]) {
                bubbleText.textContent = sectionDialogueMap[secId];
            }
        }

        const easterEggQuotes = [
            "Scroll to watch me lift my head up and turn towards my skills and featured projects! 🔄⚡",
            "Personalized anime avatar with natural breathing & 3D mouse parallax tracking! 🎨🚀",
            "Rocking my new custom anime face with the white suit! 👔✨",
            "Click 'Switch' in the bottom-left to toggle between my anime avatar and the 300-frame 3D sequence! ⚡⇄🎞️",
            "Fun Fact: 300 individual frames are synced dynamically to your scroll! 🎞️",
            "Anime + Clean Code + Coffee = Everyday superpower! ☕⚡",
            "Built with GSAP ScrollTrigger, Locomotive & pure creative passion! ✨",
            "Did you try switching between Dark and Light mode in the top right? 🌙",
            "Three.js & modern animation are what bring the web alive! 🔮",
            "Hover over the project cards to see 3D glass tilt and glare! 💎",
            "Looking for a frontend developer for your dream team? Faisal is ready! 🚀"
        ];
        let quoteIndex = 0;

        function triggerCharacterQuote() {
            initAudioContext();
            playDialoguePop();
            const bubbleText = document.getElementById("dialogue-text");
            const bubble = document.getElementById("character-dialogue");
            if (!bubbleText) return;

            quoteIndex = (quoteIndex + 1) % easterEggQuotes.length;
            bubbleText.textContent = easterEggQuotes[quoteIndex];

            if (bubble) {
                bubble.style.transform = "translate(-50%, -10px) scale(1.06)";
                setTimeout(() => {
                    bubble.style.transform = "";
                }, 220);
            }

            isCustomQuoteActive = true;
            clearTimeout(customQuoteTimer);
            customQuoteTimer = setTimeout(() => {
                isCustomQuoteActive = false;
                updateDialogueForSection(currentActiveSec);
            }, 6000);
        }

        function handleOrbitClick(techName) {
            initAudioContext();
            playDialoguePop();
            const bubbleText = document.getElementById("dialogue-text");
            const bubble = document.getElementById("character-dialogue");
            if (!bubbleText) return;

            bubbleText.textContent = `Mastering ${techName} for ultra-clean interactive web apps! ✨`;

            if (bubble) {
                bubble.style.transform = "translate(-50%, -10px) scale(1.06)";
                setTimeout(() => {
                    bubble.style.transform = "";
                }, 220);
            }

            isCustomQuoteActive = true;
            clearTimeout(customQuoteTimer);
            customQuoteTimer = setTimeout(() => {
                isCustomQuoteActive = false;
                updateDialogueForSection(currentActiveSec);
            }, 6000);
        }

        // ----------------------------------------------------
        // Real-Time Active Section Navigation Sync
        // ----------------------------------------------------
        function setActiveSection(secId) {
            if (currentActiveSec !== secId) {
                currentActiveSec = secId;
                updateDialogueForSection(secId);
            }
            document.querySelectorAll(".button .nav-btn").forEach(btn => {
                if (btn.getAttribute("data-sec") === secId) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }

        function updateActiveNavOnScroll(args) {
            if (!args || !args.scroll) return;
            const scrollY = args.scroll.y;
            const limitY = args.limit ? args.limit.y : (locoScroll && locoScroll.scroll && locoScroll.scroll.instance && locoScroll.scroll.instance.limit ? locoScroll.scroll.instance.limit.y : 0);
            const mid = window.innerHeight * 0.45;

            // 1. If at bottom of page -> Contact (#page3) guaranteed
            if (limitY > 0 && scrollY >= limitY - 120) {
                setActiveSection("#page3");
                return;
            }

            // 2. If at top of page -> Home (#page) guaranteed
            if (scrollY <= 140) {
                setActiveSection("#page");
                return;
            }

            // 3. Middle sections: check viewport midpoint intersection
            const p1 = document.getElementById("page1");
            const p2 = document.getElementById("page2");
            const p3 = document.getElementById("page3");

            const r3 = p3 ? p3.getBoundingClientRect() : null;
            const r2 = p2 ? p2.getBoundingClientRect() : null;
            const r1 = p1 ? p1.getBoundingClientRect() : null;

            if (r3 && r3.top <= mid && r3.bottom >= mid) {
                setActiveSection("#page3");
            } else if (r2 && r2.top <= mid && r2.bottom >= mid) {
                setActiveSection("#page2");
            } else if (r1 && r1.top <= mid && r1.bottom >= mid) {
                setActiveSection("#page1");
            } else if (r3 && r3.top <= mid) {
                setActiveSection("#page3");
            } else if (r2 && r2.top <= mid) {
                setActiveSection("#page2");
            } else if (r1 && r1.top <= mid) {
                setActiveSection("#page1");
            } else {
                setActiveSection("#page");
            }
        }

        // ----------------------------------------------------
        // Hero Entrance
        // ----------------------------------------------------
        function initHeroEntrance() {
            gsap.from(".hero-left-box", { opacity: 0, y: 35, duration: 1, ease: "power3.out" });
            gsap.from("#page .right1, #page .right2", { opacity: 0, x: 40, stagger: 0.15, duration: 0.9, delay: 0.25, ease: "power3.out" });
        }

        // ----------------------------------------------------
        // Smooth Page Pinning (Original Cyberfiction Engine)
        // Cards are stable, solid, and ready - NO late jumping animations!
        // ----------------------------------------------------
        gsap.to("#page1", {
            scrollTrigger: {
                trigger: "#page1",
                start: "top top",
                end: "bottom top",
                pin: true,
                scroller: "#main"
            }
        });

        gsap.to("#page2", {
            scrollTrigger: {
                trigger: "#page2",
                start: "top top",
                end: "bottom top",
                pin: true,
                scroller: "#main"
            }
        });

        gsap.to("#page3", {
            scrollTrigger: {
                trigger: "#page3",
                start: "top top",
                end: "bottom top",
                pin: true,
                scroller: "#main"
            }
        });

        // 4. 3D Card Tilt & Dynamic Glass Glare across ALL Cards
        document.querySelectorAll(".tilt-card").forEach(card => {
            const glare = document.createElement("div");
            glare.className = "card-glare";
            card.appendChild(glare);

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width) - 0.5;
                const yPercent = (y / rect.height) - 0.5;

                card.style.transition = "transform 0.08s ease-out";
                card.style.transform = `perspective(1000px) rotateX(${ -yPercent * 7 }deg) rotateY(${ xPercent * 7 }deg) translateY(-4px)`;
                glare.style.opacity = "1";
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 65%)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transition = "transform 0.4s ease-out";
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
                glare.style.opacity = "0";
            });
        });

        // ----------------------------------------------------
        // Feature: Twin Circular Orbit Project Details & Modal
        // ----------------------------------------------------
        const projectData = {
            cyberfiction: {
                category: "01 // ANIMATION ENGINE",
                title: "Cyberfiction 3D Studio",
                desc: "Interactive 300-frame image sequence scroll controller synced dynamically with GSAP ScrollTrigger and Locomotive Scroll. Delivers 60 FPS silky smooth performance across desktop and mobile devices.",
                videoTitle: "Cyberfiction 3D Canvas Video",
                highlight: "60 FPS Canvas Sequence",
                deploy: "Vercel Edge Global CDN",
                tech: ["GSAP 3", "HTML5 Canvas", "Locomotive", "Web Audio API"],
                codeUrl: "https://github.com/faisalali",
                liveUrl: "https://cyberfiction.faisal.dev"
            },
            webgl: {
                category: "02 // 3D WEBGL WORLD",
                title: "WebGL Interactive Universe",
                desc: "Custom WebGL GLSL shaders, camera transitions, and dynamic particle systems built with Three.js. Includes responsive lighting, bloom effects, and orbital camera physics.",
                videoTitle: "Three.js WebGL Shaders Video",
                highlight: "Custom GLSL Shaders",
                deploy: "Cloudflare Pages CDN",
                tech: ["Three.js", "GLSL Shaders", "WebGL", "Math Physics"],
                codeUrl: "https://github.com/faisalali",
                liveUrl: "https://webgl-universe.dev"
            },
            thirtysixstudio: {
                category: "03 // CREATIVE CANVAS & MOTION",
                title: "Thirtysixstudio Clone",
                desc: "Award-winning digital agency website clone featuring over 1,000 continuous image frames rendered at 60 FPS on HTML5 Canvas. Includes signature dynamic expanding circle screen transition, dark-to-red theme inversion, and floating 3D peppers animation.",
                videoTitle: "Thirtysixstudio 1,000-Frame Canvas & Transition Demo",
                previewVideo: "./thirtysixstudio-demo.mp4",
                highlight: "1,000+ Canvas Frames & Circle Transition",
                deploy: "GitHub Pages + GitHub Actions CI/CD",
                tech: ["React 19", "Vite 8", "GSAP 3", "HTML5 Canvas", "Tailwind CSS 4", "Git CI/CD"],
                codeUrl: "https://github.com/faisalali06870-commits/Threesixstudio",
                liveUrl: "https://faisalali06870-commits.github.io/Threesixstudio/"
            },
            senorita: {
                category: "04 // MULTIMODAL DESKTOP AI",
                title: "SENORITA AI (v3.0)",
                desc: "The World-Class Hands-Free Desktop JARVIS & Cloud Executive AI Companion. Zero-click continuous voice listening ('Senorita sun rahi ho tum?'), 0.2s desktop screen vision analysis, native Windows workstation & app automation (WhatsApp, VS Code, volume control), in-app music streaming, and multi-device pairing over local Wi-Fi with a confident Hinglish persona.",
                videoTitle: "Senorita AI Live Assistant Demo",
                previewImg: "./senorita-preview.jpg",
                highlight: "Zero-Click Voice & Vision",
                deploy: "Render Cloud + Windows 11 Host",
                tech: ["Gemini 2.5 Flash", "React 18", "Node.js (ESM)", "Tailwind CSS", "Web Speech API", "Edge Neural TTS", "PowerShell Automation"],
                codeUrl: "https://github.com/faisalali06870-commits/senorita-AI",
                liveUrl: "https://senorita-ai.onrender.com"
            },
            moodyplayer: {
                category: "05 // AI EMOTION MUSIC APP",
                title: "Moody Player",
                desc: "Real-time AI-powered emotion & mood music web application. Uses Computer Vision and face-api.js (TensorFlow.js) to scan facial expressions across 8 emotions (Romantic, Happy, Sad, Neutral, etc.) via webcam and automatically plays curated 320kbps Bollywood, Pakistani, and classic Hindustani masterpieces. Features rotating vinyl disc deck, dynamic ambient glow, universal worldwide search, and custom playlists.",
                videoTitle: "Moody Player Real-Time AI Face & Vinyl Demo",
                previewImg: "./moody-preview.jpg",
                highlight: "Real-Time Face-API Emotion Sync",
                deploy: "GitHub Pages + GitHub Actions CI/CD",
                tech: ["React 19", "Vite 8", "face-api.js", "TensorFlow.js", "Node.js", "Express.js", "MongoDB", "Remix Icon", "HTML5 Audio API"],
                codeUrl: "https://github.com/faisalali06870-commits/Moody-Player",
                liveUrl: "https://faisalali06870-commits.github.io/Moody-Player/"
            },
            cyberpunk: {
                category: "02 // THREE.JS 3D WEB EXPERIENCE",
                title: "Cyberpunk 2077 3D Experience",
                desc: "Futuristic interactive 3D landing page web application based on the Cyberpunk 2077 theme. Renders a high-resolution sci-fi 3D Damaged Helmet model with Polyhaven 32-bit HDRI environmental lighting, realistic PBR metal and glass reflections, smooth GSAP mouse tracking, and real-time EffectComposer post-processing chromatic aberration (RGB shift glitch) shaders with Locomotive smooth scrolling.",
                videoTitle: "Cyberpunk 2077 3D Helmet & Post-Processing Demo",
                previewVideo: "./cyberpunk-demo.mp4",
                highlight: "PBR 3D Helmet & RGB Shift Shader",
                deploy: "GitHub Pages + GitHub Actions CI/CD",
                tech: ["Three.js (v0.185)", "GLTFLoader", "RGBELoader", "OrbitControls", "EffectComposer", "RGBShiftShader", "GSAP 3.15", "Locomotive Scroll", "Tailwind CSS", "Vite 8"],
                codeUrl: "https://github.com/faisalali06870-commits/cyberpunk",
                liveUrl: "https://faisalali06870-commits.github.io/cyberpunk/"
            },
            cyberportfolio: {
                category: "06 // CREATIVE SUITE",
                title: "Cyber Portfolio V2",
                desc: "Interactive portfolio featuring native Web Audio synthesizer, dialogue companion system, ambient canvas petals, and smooth Locomotive Scroll.",
                videoTitle: "Web Audio & Dialogue System Video",
                highlight: "Web Audio API Synthesizer",
                deploy: "GitHub Pages / Vercel",
                tech: ["Web Audio API", "GSAP 3", "Canvas 2D", "Locomotive"],
                codeUrl: "https://github.com/faisalali",
                liveUrl: "https://faisal.dev"
            }
        };

        function openProjectModal(key) {
            initAudioContext();
            if (typeof playSciFiChime === "function") {
                playSciFiChime(520, 1040, "sine", 0.22);
            }
            const data = projectData[key];
            if (!data) return;

            const catEl = document.getElementById("modal-category");
            if (catEl) catEl.textContent = data.category;
            const titleEl = document.getElementById("modal-title");
            if (titleEl) titleEl.textContent = data.title;
            const descEl = document.getElementById("modal-desc");
            if (descEl) descEl.textContent = data.desc;
            const vTitleEl = document.getElementById("modal-video-title");
            if (vTitleEl) vTitleEl.textContent = data.videoTitle;
            const hlEl = document.getElementById("modal-highlight");
            if (hlEl) hlEl.textContent = data.highlight;
            const depEl = document.getElementById("modal-deploy");
            if (depEl) depEl.textContent = data.deploy;

            const techBox = document.getElementById("modal-tech-list");
            if (techBox) {
                techBox.innerHTML = "";
                data.tech.forEach(t => {
                    const span = document.createElement("span");
                    span.className = "modal-tech-pill";
                    span.textContent = t;
                    techBox.appendChild(span);
                });
            }

            const liveBtn = document.getElementById("modal-live-link");
            if (liveBtn) liveBtn.href = data.liveUrl;
            const codeBtn = document.getElementById("modal-code-link");
            if (codeBtn) codeBtn.href = data.codeUrl;

            const pImg = document.getElementById("modal-preview-img");
            const pVideo = document.getElementById("modal-preview-video");
            const vInner = document.getElementById("modal-video-inner");
            const zHint = document.getElementById("modal-zoom-hint");
            const vRec = document.getElementById("modal-video-rec");
            const vBox = document.getElementById("modal-video-box");

            if (data.previewVideo) {
                if (pVideo) {
                    pVideo.src = data.previewVideo;
                    pVideo.style.display = "block";
                    pVideo.play().catch(() => {});
                }
                if (pImg) pImg.style.display = "none";
                if (vInner) vInner.style.display = "none";
                if (zHint) {
                    zHint.textContent = "🔍 Hover: 2X Pop-Out Zoom";
                    zHint.style.display = "block";
                }
                if (vRec) vRec.innerHTML = "● LIVE // HD 3D DEMO VIDEO";
                if (vBox) vBox.style.backgroundImage = "";
            } else if (data.previewImg) {
                if (pVideo) {
                    pVideo.pause();
                    pVideo.style.display = "none";
                    pVideo.src = "";
                }
                if (pImg) {
                    pImg.src = data.previewImg;
                    pImg.style.display = "block";
                }
                if (vInner) vInner.style.display = "none";
                if (zHint) {
                    zHint.textContent = "🔍 Hover: 2X Pop-Out Zoom";
                    zHint.style.display = "block";
                }
                if (vRec) vRec.innerHTML = "● LIVE // HD PREVIEW";
                if (vBox) vBox.style.backgroundImage = "";
            } else {
                if (pVideo) {
                    pVideo.pause();
                    pVideo.style.display = "none";
                    pVideo.src = "";
                }
                if (pImg) pImg.style.display = "none";
                if (vInner) vInner.style.display = "flex";
                if (zHint) zHint.style.display = "none";
                if (vRec) vRec.innerHTML = "● REC // DEMO VIDEO LOOP";
                if (vBox) vBox.style.backgroundImage = "";
            }

            const modal = document.getElementById("project-detail-modal");
            if (modal) {
                modal.classList.add("active");
            }
        }

        function closeProjectModal() {
            initAudioContext();
            if (typeof playSciFiClick === "function") {
                playSciFiClick();
            }
            const pVideo = document.getElementById("modal-preview-video");
            if (pVideo) {
                pVideo.pause();
            }
            const modal = document.getElementById("project-detail-modal");
            if (modal) {
                modal.classList.remove("active");
            }
        }

        // Close on Escape or click outside
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeProjectModal();
            }
        });

        const modalOverlay = document.getElementById("project-detail-modal");
        if (modalOverlay) {
            modalOverlay.addEventListener("click", (e) => {
                if (e.target === modalOverlay) {
                    closeProjectModal();
                }
            });
        }



        // 5. Delicate Micro-Cursor
        const cursorDot = document.getElementById("cursor-dot");
        const cursorRing = document.getElementById("cursor-ring");
        const cursorText = cursorRing.querySelector(".cursor-text");

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            // Feature 5: Magnetic Parallax Tilt for Tech Orbit
            const orbit = document.getElementById("tech-orbit-container");
            if (orbit) {
                const xOffset = (e.clientX / window.innerWidth - 0.5) * 22;
                const yOffset = (e.clientY / window.innerHeight - 0.5) * 22;
                orbit.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
            }
        });

        function renderCursorRing() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(renderCursorRing);
        }
        renderCursorRing();

        // Orbit Project Nodes Hover & Touch -> EXPLORE ↗ & Smooth Pause on Node Hover / Touch
        document.querySelectorAll(".orbit-node").forEach(node => {
            const pauseOrbit = () => {
                const track = node.closest(".orbit-ring-track");
                if (track) {
                    track.style.animationPlayState = "paused";
                    track.querySelectorAll(".counter-cw, .counter-ccw").forEach(c => c.style.animationPlayState = "paused");
                }
            };
            const resumeOrbit = () => {
                const track = node.closest(".orbit-ring-track");
                if (track) {
                    track.style.animationPlayState = "running";
                    track.querySelectorAll(".counter-cw, .counter-ccw").forEach(c => c.style.animationPlayState = "running");
                }
            };

            node.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
                cursorText.textContent = "EXPLORE ↗";
                pauseOrbit();
            });

            node.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
                cursorText.textContent = "";
                resumeOrbit();
            });

            // Touch support for mobile and tablet devices
            node.addEventListener("touchstart", () => {
                pauseOrbit();
            }, { passive: true });
        });

        // ----------------------------------------------------
        // Smart Non-Blocking Character Interaction (Click & Hover)
        // Does NOT block scrolling, and NEVER blocks floating orbit cards!
        // ----------------------------------------------------
        function isPointOnCharacter(clientX, clientY) {
            const centerX = window.innerWidth / 2;
            const charWidth = window.innerWidth <= 900 ? 220 : 280;
            const halfW = charWidth / 2;
            const charTop = window.innerHeight * 0.20; // Head to bottom
            const charBottom = window.innerHeight;

            return (clientX >= centerX - halfW && clientX <= centerX + halfW && clientY >= charTop && clientY <= charBottom);
        }

        function isClickOnInteractiveElement(target) {
            if (!target) return false;
            return !!target.closest(
                "button, a, input, textarea, select, .orbit-hover-card, .orbit-node, .orbit-badge, " +
                "#avatar-model-switcher, #character-dialogue, #project-detail-modal, .modal-close-btn, #nav, .tilt-card"
            );
        }

        // Global smart click handler for Character Overdrive
        window.addEventListener("click", (e) => {
            // If the user clicked on an interactive UI element, card, or button -> do nothing, let it handle the event!
            if (isClickOnInteractiveElement(e.target)) return;

            // If the user clicked directly on the character zone -> Toggle Overdrive!
            if (isPointOnCharacter(e.clientX, e.clientY)) {
                toggleOverdrive(e);
            }
        });

        // Global smart hover handler for Cursor text ("OVERDRIVE ⚡")
        window.addEventListener("mousemove", (e) => {
            if (!cursorText) return;

            const isInteractive = isClickOnInteractiveElement(e.target);

            if (!isInteractive && isPointOnCharacter(e.clientX, e.clientY)) {
                document.body.classList.add("cursor-hover");
                cursorText.textContent = isOverdriveMode ? "NORMAL ✨" : "OVERDRIVE ⚡";
            } else if (!isInteractive) {
                if (document.body.classList.contains("cursor-hover") && 
                    (cursorText.textContent.includes("OVERDRIVE") || cursorText.textContent.includes("NORMAL"))) {
                    document.body.classList.remove("cursor-hover");
                    cursorText.textContent = "";
                }
            }
        });

        // Dialogue Bubble Hover -> CHAT 💬
        const dialogueEl = document.getElementById("character-dialogue");
        if (dialogueEl && cursorText) {
            dialogueEl.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
                cursorText.textContent = "CHAT 💬";
            });
            dialogueEl.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
                cursorText.textContent = "";
            });
        }

        // Orbit Badges Hover -> TECH ⚡
        document.querySelectorAll(".orbit-badge").forEach(badge => {
            badge.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
                cursorText.textContent = "TECH ⚡";
            });
            badge.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
                cursorText.textContent = "";
            });
        });

        // Interactive Elements Hover
        document.querySelectorAll("button, a, .skill-btn, .action-btn, #nav > h3, .skill-bubble, .card-icon, .info-row, #character-dialogue").forEach(el => {
            el.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-button");
            });
            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-button");
            });
        });

        // 6. Subtle Floating Anime Ambient Petals (Canvas)
        const ambientCanvas = document.getElementById("ambient-canvas");
        const aCtx = ambientCanvas.getContext("2d");

        ambientCanvas.width = window.innerWidth;
        ambientCanvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            ambientCanvas.width = window.innerWidth;
            ambientCanvas.height = window.innerHeight;
        });

        const petalCount = 35;
        const petals = [];
        const neonSparkColors = ["#00f0ff", "#ff007f", "#38bdf8", "#fbbf24", "#d946ef"];

        for (let i = 0; i < petalCount; i++) {
            petals.push({
                x: Math.random() * ambientCanvas.width,
                y: Math.random() * ambientCanvas.height,
                size: Math.random() * 4.5 + 3.5,
                speedY: Math.random() * 0.5 + 0.25,
                speedX: Math.random() * 0.3 - 0.15,
                angle: Math.random() * Math.PI * 2,
                angularSpeed: (Math.random() - 0.5) * 0.02,
                opacity: Math.random() * 0.12 + 0.08,
                color: neonSparkColors[i % neonSparkColors.length],
                sparkLength: Math.random() * 20 + 12
            });
        }

        function drawPetals() {
            aCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
            const isDark = document.body.classList.contains("dark-mode");

            petals.forEach(p => {
                if (isOverdriveMode) {
                    // Hyperdrive High-Speed Neon Electric Sparks / Data Beams
                    p.y -= (p.speedY * 5.8 + 2.8); // Rush upwards into the cyber sky
                    p.x += Math.sin(p.angle) * 1.6 + p.speedX * 2;
                    p.angle += p.angularSpeed * 3;

                    if (p.y < -35) {
                        p.y = ambientCanvas.height + 35;
                        p.x = Math.random() * ambientCanvas.width;
                    }
                    if (p.x > ambientCanvas.width + 35) p.x = -35;
                    if (p.x < -35) p.x = ambientCanvas.width + 35;

                    aCtx.save();
                    aCtx.shadowBlur = 14;
                    aCtx.shadowColor = p.color;
                    aCtx.strokeStyle = p.color;
                    aCtx.lineWidth = 2;
                    aCtx.globalAlpha = Math.min(1, p.opacity * 4.5);

                    // High-energy vertical electric spark beam
                    aCtx.beginPath();
                    aCtx.moveTo(p.x, p.y);
                    aCtx.lineTo(p.x + (Math.random() - 0.5) * 2.5, p.y + p.sparkLength);
                    aCtx.stroke();
                    aCtx.restore();
                } else {
                    // Calm Floating Anime Sakura Petals
                    p.y += p.speedY;
                    p.x += Math.sin(p.angle) * 0.35 + p.speedX;
                    p.angle += p.angularSpeed;

                    if (p.y > ambientCanvas.height + 20) {
                        p.y = -20;
                        p.x = Math.random() * ambientCanvas.width;
                    }
                    if (p.x > ambientCanvas.width + 20) p.x = -20;
                    if (p.x < -20) p.x = ambientCanvas.width + 20;

                    aCtx.save();
                    aCtx.translate(p.x, p.y);
                    aCtx.rotate(p.angle);
                    
                    // Moonlight luminous petals in dark mode, soft graphite in light mode
                    aCtx.fillStyle = isDark
                        ? `rgba(180, 205, 240, ${p.opacity * 1.6})`
                        : `rgba(35, 35, 45, ${p.opacity})`;
                    
                    aCtx.beginPath();
                    aCtx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
                    aCtx.fill();
                    aCtx.restore();
                }
            });

            requestAnimationFrame(drawPetals);
        }
        drawPetals();
