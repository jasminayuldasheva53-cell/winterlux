import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { FiLogOut, FiUser, FiArrowRight, FiMapPin, FiPlay, FiChevronDown, FiMail, FiPhone, FiInstagram, FiGithub, FiTwitter } from 'react-icons/fi';
import { FaSnowflake, FaMountain } from 'react-icons/fa';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: credentialResponse.credential
      });
      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('accessToken', res.data.accessToken);
      }
    } catch (err) {
      console.error("Xatolik:", err.response?.data || err.message);
      alert("Kirishda xatolik! Backend ishlayotganini tekshiring.");
    }
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout');
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  // ==========================================
  // 1. LOGIN SAHIFASI
  // ==========================================
  if (!user) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#050B14] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 w-full max-w-md p-1 rounded-3xl bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="bg-[#0a1120]/80 p-10 rounded-[22px] flex flex-col items-center">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-4 rounded-full mb-6 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <FiUser className="text-4xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Xush kelibsiz</h1>
            <p className="text-gray-400 mb-8 text-center text-sm">Hashamatli qishki olamga kirish uchun hisobingizga kiring.</p>
            
            <div className="w-full flex justify-center">
               <GoogleLogin
                 onSuccess={handleSuccess}
                 onError={() => console.log('Login Failed')}
                 shape="pill"
                 size="large"
                 theme="filled_blue"
               />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. PREMIUM QISHKI SAYT (DASHBOARD)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full top-0 z-50 bg-[#050B14]/60 backdrop-blur-2xl border-b border-white/5 px-6 lg:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <FaSnowflake className="text-2xl text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-white uppercase hidden sm:block">Winter<span className="text-cyan-400">Lux</span></h2>
        </div>
        
        {/* Navbar markaziy menyu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">Asosiy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Kurortlar</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Xizmatlar</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Biz haqimizda</a>
        </div>

        {/* Profil qismi */}
        <div className="flex items-center gap-4">
          <div className="group relative flex items-center gap-3 bg-white/5 hover:bg-white/10 py-1.5 px-2 pr-4 rounded-full border border-white/10 transition-all cursor-pointer">
            <img src={user.picture} alt="Profile" className="w-9 h-9 rounded-full border-2 border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
            <span className="text-sm font-semibold text-gray-200 hidden sm:block">{user.name}</span>
            <FiChevronDown className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
            
            {/* Dropdown menyu (ustiga borganda chiqadi) */}
            <div className="absolute top-full right-0 mt-3 w-56 bg-[#0a1120] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <div className="p-2">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2.5 rounded-xl transition-colors">
                  <FiLogOut /> Chiqish
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1543689604-4042ccd4d2b9?q=80&w=2070&auto=format&fit=crop" alt="Winter" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/80 via-[#050B14]/70 to-[#050B14]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
            <FaMountain className="text-cyan-400" />
            <span className="text-sm font-medium tracking-wide text-gray-200">Premium Qishki Sayohatlar</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tighter drop-shadow-2xl">
            Qishning <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
              sehrli olami
            </span> <br/>
            sizni kutmoqda.
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Eng hashamatli kurortlar, qorli cho'qqilar va unutilmas sarguzashtlar. Biz bilan qishning har bir lahzadan zavqlaning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative inline-flex items-center gap-3 bg-white text-[#050B14] font-bold px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1">
              <span>Sayohatni boshlash</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group inline-flex items-center gap-3 bg-white/5 text-white font-medium px-8 py-4 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all">
              <div className="bg-white/10 p-2 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <FiPlay size={14} className="ml-0.5" />
              </div>
              <span>Video ko'rish</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= CARDS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group relative bg-[#0a1120] rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col">
            <div className="h-72 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent z-10"></div>
               <img src="https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="Lake" />
               <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                 <FiMapPin className="text-cyan-400" size={14} />
                 <span className="text-xs font-semibold tracking-wider text-white">Shveytsariya</span>
               </div>
            </div>
            <div className="p-8 relative -mt-16 z-20 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Muzlagan ko'llar</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">Tabiatning eng go'zal muzga aylangan manzaralarini tomosha qiling va unutilmas xotiralar qoldiring.</p>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                <span className="text-white font-bold text-lg">$1,200 <span className="text-gray-500 text-sm font-normal">/tunda</span></span>
                <button className="bg-white/5 hover:bg-cyan-500 p-3 rounded-full text-white transition-colors duration-300">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group relative bg-[#0a1120] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col">
            <div className="h-72 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent z-10"></div>
               <img src="https://images.unsplash.com/photo-1605524253350-8eb1ab592c89?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="Cabin" />
               <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                 <FiMapPin className="text-blue-400" size={14} />
                 <span className="text-xs font-semibold tracking-wider text-white">AQSh, Aspen</span>
               </div>
            </div>
            <div className="p-8 relative -mt-16 z-20 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Hashamatli uylar</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">Kamin yonida iliq choy, hashamatli dizayn va tog'ning betakror manzarasi bir joyda.</p>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                <span className="text-white font-bold text-lg">$2,500 <span className="text-gray-500 text-sm font-normal">/tunda</span></span>
                <button className="bg-white/5 hover:bg-blue-500 p-3 rounded-full text-white transition-colors duration-300">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-[#0a1120] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col">
            <div className="h-72 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent z-10"></div>
               <img src="https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="Mountain" />
               <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                 <FiMapPin className="text-purple-400" size={14} />
                 <span className="text-xs font-semibold tracking-wider text-white">O'zbekiston</span>
               </div>
            </div>
            <div className="p-8 relative -mt-16 z-20 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ekstrimal sarguzasht</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">Chimyon va Beldersoyning qorli cho'qqilarida chang'i uchish va ekstrimal sayohatlar.</p>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                <span className="text-white font-bold text-lg">$800 <span className="text-gray-500 text-sm font-normal">/tunda</span></span>
                <button className="bg-white/5 hover:bg-purple-500 p-3 rounded-full text-white transition-colors duration-300">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#03070f] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-cyan-500/5 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Branding */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20">
                  <FaSnowflake className="text-2xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold tracking-widest text-white uppercase">Winter<span className="text-cyan-400">Lux</span></h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
                Biz bilan qishning eng go'zal va unutilmas lahzalarini kashf eting. Premium xizmatlar va hashamatli dam olish maskanlari.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="bg-white/5 p-2.5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"><FiInstagram size={18} /></a>
                <a href="#" className="bg-white/5 p-2.5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"><FiGithub size={18} /></a>
                <a href="#" className="bg-white/5 p-2.5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"><FiTwitter size={18} /></a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Kompaniya</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Biz haqimizda</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Karyera</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Yangiliklar</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Hamkorlar</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Aloqa</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3"><FiMail /> support@winterlux.uz</li>
                <li className="flex items-center gap-3"><FiPhone /> +998 90 123 45 67</li>
                <li className="flex items-center gap-3"><FiMapPin /> Toshkent, O'zbekiston</li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">© 2024 WinterLux. Barcha huquqlar himoyalangan.</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;