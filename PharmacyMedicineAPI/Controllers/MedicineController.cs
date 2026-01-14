using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PharmacyMedicineAPI.DataRepository;
using PharmacyMedicineAPI.Models;

namespace PharmacyMedicineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly MedicinesRepository _medicinesRepository = new();
        [HttpGet]
        public IActionResult GetAllMedicines()
        {
             return Ok(_medicinesRepository.GetAllMedicines());
        }

        [HttpPost]
        public IActionResult AddMedicine([FromBody] Medicine medicine)
        {
            _medicinesRepository.AddMedicine(medicine);
            return CreatedAtAction(nameof(GetAllMedicines), new { id = medicine.Id }, medicine);
        }
    }
}
