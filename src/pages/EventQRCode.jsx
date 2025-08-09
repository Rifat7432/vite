import { Plus } from 'lucide-react'

const EventQRCode = () => {
  const qrCodes = Array.from({ length: 9 }, (_, i) => ({ count: i + 1 }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event QR Code</h1>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-lg hover:opacity-90 font-medium">
          <Plus className="mr-2 w-5 h-5" />
          Add Ticket
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD]">
            <tr className="text-white font-semibold">
              <th className="px-6 py-4 text-center">Count</th>
              <th className="px-6 py-4 text-center">QR Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {qrCodes.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 text-center">{item.count}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-gray-800 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-lg hover:opacity-90 font-medium">
          Send CSV Link
        </button>
        <button className="px-6 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-lg hover:opacity-90 font-medium">
          Download PDF
        </button>
      </div>
    </div>
  )
}

export default EventQRCode
