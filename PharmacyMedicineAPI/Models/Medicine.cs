using System.Data;

namespace PharmacyMedicineAPI.Models
{
    public class Medicine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Brand { get; set; }
        public DateTime ExpiryDate { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        
    }
}
