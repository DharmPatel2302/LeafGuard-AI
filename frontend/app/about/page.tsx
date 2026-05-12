import Link from "next/link";

export default function About() {
  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-8 w-full flex-grow relative">
      <div className="grainy-surface fixed inset-0 z-[-1] pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="mb-32 mt-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-4 block">Process Workflow</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-6">How LeafScan Works</h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg leading-relaxed">Leveraging state-of-the-art computer vision to bridge the gap between clinical pathology and everyday gardening.</p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="relative group">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">upload_file</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Upload</h3>
              <p className="text-on-surface-variant text-sm">Capture or drag-and-drop a high-resolution image of the affected plant leaf.</p>
            </div>
            <div className="hidden md:block absolute top-[40%] -right-8 z-10 text-outline-variant">
              <span className="material-symbols-outlined text-4xl">trending_flat</span>
            </div>
          </div>
          {/* Step 2 */}
          <div className="relative group">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mb-6 text-tertiary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-on-surface-variant text-sm">Our dual-model pipeline validates botanical features and classifies symptoms.</p>
            </div>
            <div className="hidden md:block absolute top-[40%] -right-8 z-10 text-outline-variant">
              <span className="material-symbols-outlined text-4xl">trending_flat</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">analytics</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Results</h3>
            <p className="text-on-surface-variant text-sm">Receive a clinical-grade diagnosis with heatmaps and organic treatment plans.</p>
          </div>
        </div>
      </section>

      {/* AI Pipeline Section - IMPROVED */}
      <section className="mb-32 bg-gradient-to-br from-surface-container-low to-surface-container -mx-8 px-8 py-24 rounded-[3rem] shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-4 block">Core Architecture</span>
            <h2 className="text-4xl font-extrabold tracking-tight">Our AI Pipeline</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm">Built on optimized neural architectures for edge-device speed and lab-grade accuracy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 - Enhanced */}
          <div className="bg-surface-container-highest p-10 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-outline-variant/20 group">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ring-1 ring-primary/20">
                  Input Guard
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Leaf Validator (MobileNetV2)</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                The first line of defense. This lightweight model filters non-leaf images and ensures the leaf is centered, preventing false positives from background noise.
              </p>
            </div>
            <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                <span>Inference Time</span>
                <span className="text-primary text-base">45ms</span>
              </div>
              <div className="w-full bg-surface-variant/50 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/70 h-full w-[15%] rounded-full shadow-sm transition-all duration-500 group-hover:w-[20%]"></div>
              </div>
            </div>
          </div>
          
          {/* Card 2 - Enhanced */}
          <div className="bg-surface-container-highest p-10 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-outline-variant/20 group">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-tertiary/10 text-tertiary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ring-1 ring-tertiary/20">
                  Diagnostic Engine
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-tertiary transition-colors">Disease Classifier (EfficientNetB1)</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Our heavy-lifter. Optimized for high-resolution leaf texture analysis, it detects subtle chlorosis, fungal lesions, and necrotic spots with 99.2% accuracy.
              </p>
            </div>
            <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                <span>Parameter Efficiency</span>
                <span className="text-tertiary text-sm">High-Res Scan</span>
              </div>
              <div className="w-full bg-surface-variant/50 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-tertiary to-tertiary/70 h-full w-[85%] rounded-full shadow-sm transition-all duration-500 group-hover:w-[90%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Plants Grid */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Supported Species</h2>
          <p className="text-on-surface-variant">Continuous training expands our clinical database monthly.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Banana */}
          <Link href="/gallery?category=banana" className="bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-2xl flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-125 transition-transform duration-300">breakfast_dining</span>
            <h4 className="font-bold text-on-surface">Banana</h4>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant mt-2 bg-surface-container py-1 px-3 rounded-full">4 DISEASES</span>
          </Link>
          {/* Guava */}
          <Link href="/gallery?category=guava" className="bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-2xl flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-125 transition-transform duration-300">spa</span>
            <h4 className="font-bold text-on-surface">Guava</h4>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant mt-2 bg-surface-container py-1 px-3 rounded-full">4 DISEASES</span>
          </Link>
          {/* Mango */}
          <Link href="/gallery?category=mango" className="bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-2xl flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-125 transition-transform duration-300">nature</span>
            <h4 className="font-bold text-on-surface">Mango</h4>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant mt-2 bg-surface-container py-1 px-3 rounded-full">7 DISEASES</span>
          </Link>
          {/* Papaya */}
          <Link href="/gallery?category=papaya" className="bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-2xl flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-125 transition-transform duration-300">eco</span>
            <h4 className="font-bold text-on-surface">Papaya</h4>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant mt-2 bg-surface-container py-1 px-3 rounded-full">7 DISEASES</span>
          </Link>
          {/* Strawberry */}
          <Link href="/gallery?category=strawberry" className="bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-2xl flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-125 transition-transform duration-300">nutrition</span>
            <h4 className="font-bold text-on-surface">Strawberry</h4>
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant mt-2 bg-surface-container py-1 px-3 rounded-full">1 DISEASE</span>
          </Link>
        </div>
      </section>

      {/* Explainable AI (XAI) Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img alt="Microscopic analysis of a plant leaf showing segmentation" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAejtr67zNyQ22g_6mEmjiCaUXsIjRmIp8IlOO2XbqRH1czB8YRgYEROfxB2VbCoV8NDJAc8qcy4vSNua1kEy3WopXaXEAaOGjs6ZzdCNofARRlJEpnioCw8EgWN93gbJiITHsaO5BSO2kDY6zqfiAafNm7K4T1cVnFMYJE0Ca9n2Nmmd4tGGnf7SlGBk1RiQDPXl-HU0AZU3LwnG9VBwIt2i030U51ylfsfaD48wrZ8F7qBn_A7ZttHtO8NbxnnQUEIUchvqvYiMg"/>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 bg-surface/95 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/20">
                  <span className="material-symbols-outlined">grid_view</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">LIME Feature Segmentation</h4>
                  <p className="text-xs text-on-surface-variant">Isolating biological markers for diagnostic transparency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-tertiary font-bold mb-4 block">Explainable AI</span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">Demystifying the &quot;Black Box&quot;</h2>
          <div className="space-y-6 text-on-surface-variant leading-relaxed">
            <p>
              We believe in <strong className="text-on-surface">Explainable AI (XAI)</strong>. Our system doesn&apos;t just give you a label; it shows you exactly why it reached its conclusion using advanced visualization techniques.
            </p>
            <div className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
              <div className="mt-1 shrink-0"><span className="material-symbols-outlined text-primary text-2xl">visibility</span></div>
              <div>
                <h4 className="font-bold text-on-surface mb-2">LIME Interrogation</h4>
                <p className="text-sm">Local Interpretable Model-agnostic Explanations segment the leaf into super-pixels to determine which biological features contributed most to the score.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}