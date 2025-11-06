export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-textprimary mb-8">
          Tailwind CSS 컬러 테마 테스트
        </h1>

        {/* Primary Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-textprimary mb-4">
            Primary Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Primary</div>
              <div className="text-sm opacity-90">#12436D</div>
            </div>
            <div className="bg-primary-light text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Primary Light</div>
              <div className="text-sm opacity-90">#1F70B7</div>
            </div>
            <div className="bg-primary-dark text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Primary Dark</div>
              <div className="text-sm opacity-90">#0D2F4A</div>
            </div>
          </div>
        </section>

        {/* Secondary Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-textprimary mb-4">
            Secondary Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Secondary</div>
              <div className="text-sm opacity-90">#1F70B7</div>
            </div>
            <div className="bg-secondary-light text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Secondary Light</div>
              <div className="text-sm opacity-90">#4A9BD9</div>
            </div>
            <div className="bg-secondary-dark text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Secondary Dark</div>
              <div className="text-sm opacity-90">#165A8F</div>
            </div>
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-textprimary mb-4">
            Semantic Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-success text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Success</div>
              <div className="text-sm opacity-90">#2E7D32</div>
            </div>
            <div className="bg-warning text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Warning</div>
              <div className="text-sm opacity-90">#F57C00</div>
            </div>
            <div className="bg-error text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Error</div>
              <div className="text-sm opacity-90">#C62828</div>
            </div>
            <div className="bg-info text-white p-6 rounded-lg">
              <div className="font-semibold mb-2">Info</div>
              <div className="text-sm opacity-90">#0277BD</div>
            </div>
          </div>
        </section>

        {/* Text Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-textprimary mb-4">
            Text Colors
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg space-y-4">
            <p className="text-textprimary text-lg">
              Primary Text - 검정색에 가까운 진한 텍스트 (#0F172A)
            </p>
            <p className="text-textsecondary text-lg">
              Secondary Text - 보조 텍스트 (#1E293B)
            </p>
            <p className="text-textmuted text-lg">
              Muted Text - 연한 텍스트 (#475569)
            </p>
            <div className="bg-primary p-4 rounded mt-4">
              <p className="text-textinverse text-lg">
                Inverse Text - 흰색 텍스트 (배경색 위)
              </p>
            </div>
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-textprimary mb-4">
            Neutral Colors (Gray Scale)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
              <div className="font-semibold text-gray-900 mb-1">Gray 50</div>
              <div className="text-xs text-gray-600">#F9FAFB</div>
            </div>
            <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg text-center">
              <div className="font-semibold text-gray-900 mb-1">Gray 100</div>
              <div className="text-xs text-gray-600">#F3F4F6</div>
            </div>
            <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg text-center">
              <div className="font-semibold text-gray-900 mb-1">Gray 200</div>
              <div className="text-xs text-gray-600">#E5E7EB</div>
            </div>
            <div className="bg-gray-300 border border-gray-400 p-4 rounded-lg text-center">
              <div className="font-semibold text-gray-900 mb-1">Gray 300</div>
              <div className="text-xs text-gray-600">#D1D5DB</div>
            </div>
            <div className="bg-gray-400 text-white p-4 rounded-lg text-center">
              <div className="font-semibold mb-1">Gray 400</div>
              <div className="text-xs opacity-90">#9CA3AF</div>
            </div>
            <div className="bg-gray-500 text-white p-4 rounded-lg text-center">
              <div className="font-semibold mb-1">Gray 500</div>
              <div className="text-xs opacity-90">#6B7280</div>
            </div>
            <div className="bg-gray-600 text-white p-4 rounded-lg text-center">
              <div className="font-semibold mb-1">Gray 600</div>
              <div className="text-xs opacity-90">#4B5563</div>
            </div>
            <div className="bg-gray-700 text-white p-4 rounded-lg text-center">
              <div className="font-semibold mb-1">Gray 700</div>
              <div className="text-xs opacity-90">#374151</div>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
              <div className="font-semibold mb-1">Gray 800</div>
              <div className="text-xs opacity-90">#1F2937</div>
            </div>
            <div className="bg-gray-900 text-white p-4 rounded-lg text-center">
              <div className="font-semibold mb-1">Gray 900</div>
              <div className="text-xs opacity-90">#111827</div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-textprimary mb-4">
            사용 예시
          </h2>
          <div className="space-y-4">
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Primary Button
            </button>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors ml-4">
              Secondary Button
            </button>
            <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg mt-4">
              ✅ Success 메시지 예시
            </div>
            <div className="bg-warning/10 border border-warning/20 text-warning px-4 py-3 rounded-lg">
              ⚠️ Warning 메시지 예시
            </div>
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg">
              ❌ Error 메시지 예시
            </div>
            <div className="bg-info/10 border border-info/20 text-info px-4 py-3 rounded-lg">
              ℹ️ Info 메시지 예시
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
