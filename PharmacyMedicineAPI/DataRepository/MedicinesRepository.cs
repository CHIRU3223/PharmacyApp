using PharmacyMedicineAPI.Models;
using System.Text.Json;

namespace PharmacyMedicineAPI.DataRepository
{
    public class MedicinesRepository
    {
        private readonly string jsonFilePath = "Data/medicines.json";

        public List<Medicine> GetAllMedicines()
        {
            if (!File.Exists(jsonFilePath))
            {
                return new List<Medicine>();
            }
            var jsonData = File.ReadAllText(jsonFilePath);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<List<Medicine>>(jsonData, options) ?? new List<Medicine>();
        }

        public void AddMedicine(Medicine medicine)
        {
            var AllMedicines = GetAllMedicines();
            medicine.Id = AllMedicines.Any() ? AllMedicines.Max(m => m.Id) + 1 : 1;
            AllMedicines.Add(medicine);
            var jsonData = JsonSerializer.Serialize(AllMedicines, new JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            File.WriteAllText(jsonFilePath, jsonData);
        }
    }
}
