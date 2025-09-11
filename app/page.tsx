import Link from "next/link";

export default async function Main() {
  return (
    <div className="main h-screen flex justify-center items-center">
      <div className="main-block bg-white rounded-2xl shadow-lg p-10 text-center max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Ласкаво просимо до нашої піцерії 🍕
        </h1>
        <p className="text-gray-600 mb-6">
          Оберіть улюблену піцу з нашого меню та насолоджуйтесь смаком.
        </p>
        <Link href='/product-list'><button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
          Переглянути меню
        </button></Link>
      </div>
    </div>
  );
}