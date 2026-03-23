import { Camera } from "lucide-react";
import Link from "next/link";

export default function RegisterFace() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2">First-Time Registration</h2>
        <p className="text-gray-500 mb-6">Please align your face within the frame to register your biometric data.</p>
        
        {/* Mock Camera View */}
        <div className="relative w-full h-72 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center mb-6">
          <div className="absolute inset-0 border-4 border-dashed border-blue-500 m-8 rounded-lg opacity-50"></div>
          <Camera size={48} className="text-gray-600" />
        </div>

        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Capture & Save Face
          </button>
          <Link href="/" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}