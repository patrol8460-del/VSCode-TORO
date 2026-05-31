using Microsoft.AspNetCore.Mvc;
using TOIR.Core;
using TOIR.Core.Data;

namespace TOIR.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly AppDbContext _db;

        public EquipmentController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _db.Equipments.ToList();
            return Ok(data);
        }
    }
}