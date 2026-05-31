
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TOIR.Core;
using TOIR.Core.Data;

namespace TOIR.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeasurableParametersController : ControllerBase
    {
        private readonly AppDbContext _db;

        public MeasurableParametersController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/measurableparameters?equipmentId=5
        [HttpGet]
        public async Task<IActionResult> GetByEquipment([FromQuery] int equipmentId)
        {
            var parameters = await _db.MeasurableParameters
                .Where(p => p.EquipmentId == equipmentId)
                .Include(p => p.Measurements.OrderBy(m => m.MeasurementDate))
                .Select(p => new
                {
                    p.Id, p.EquipmentId, p.Name, p.ReferenceValue,
                    p.UnitCode, p.UnitName, p.DeviationPlus, p.DeviationMinus, p.Note,
                    Measurements = p.Measurements.OrderBy(m => m.MeasurementDate)
                        .Select(m => new { m.Id, m.ParameterId, m.MeasurementDate, m.Value, m.Note })
                })
                .ToListAsync();
            return Ok(parameters);
        }

        // POST: api/measurableparameters
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateParamDto dto)
        {
            var param = new MeasurableParameter
            {
                EquipmentId = dto.EquipmentId,
                Name = dto.Name,
                ReferenceValue = dto.ReferenceValue,
                UnitCode = dto.UnitCode,
                UnitName = dto.UnitName,
                DeviationPlus = dto.DeviationPlus,
                DeviationMinus = dto.DeviationMinus,
                Note = dto.Note
            };
            _db.MeasurableParameters.Add(param);
            await _db.SaveChangesAsync();
            return Ok(new { param.Id, param.EquipmentId, param.Name, param.ReferenceValue, param.UnitCode, param.UnitName, param.DeviationPlus, param.DeviationMinus, param.Note });
        }

        // PUT: api/measurableparameters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateParamDto dto)
        {
            var param = await _db.MeasurableParameters.FindAsync(id);
            if (param == null) return NotFound();

            param.Name = dto.Name;
            param.ReferenceValue = dto.ReferenceValue;
            param.UnitCode = dto.UnitCode;
            param.UnitName = dto.UnitName;
            param.DeviationPlus = dto.DeviationPlus;
            param.DeviationMinus = dto.DeviationMinus;
            param.Note = dto.Note;

            await _db.SaveChangesAsync();
            return Ok(new { param.Id, param.EquipmentId, param.Name, param.ReferenceValue, param.UnitCode, param.UnitName, param.DeviationPlus, param.DeviationMinus, param.Note });
        }

        // DELETE: api/measurableparameters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var param = await _db.MeasurableParameters.Include(p => p.Measurements).FirstOrDefaultAsync(p => p.Id == id);
            if (param == null) return NotFound();

            _db.MeasurableParameters.Remove(param);
            await _db.SaveChangesAsync();
            return Ok();
        }

        // POST: api/measurableparameters/5/measurements
        [HttpPost("{id}/measurements")]
        public async Task<IActionResult> AddMeasurement(int id, [FromBody] MeasurementDto dto)
        {
            var param = await _db.MeasurableParameters.FindAsync(id);
            if (param == null) return NotFound();

            var measurement = new ParameterMeasurement
            {
                ParameterId = id,
                MeasurementDate = dto.MeasurementDate,
                Value = dto.Value,
                Note = dto.Note
            };
            _db.ParameterMeasurements.Add(measurement);
            await _db.SaveChangesAsync();
            return Ok(new { measurement.Id, measurement.ParameterId, measurement.MeasurementDate, measurement.Value, measurement.Note });
        }

        // DELETE: api/measurableparameters/measurements/5
        [HttpDelete("measurements/{id}")]
        public async Task<IActionResult> DeleteMeasurement(int id)
        {
            var measurement = await _db.ParameterMeasurements.FindAsync(id);
            if (measurement == null) return NotFound();

            _db.ParameterMeasurements.Remove(measurement);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }

    public class MeasurementDto
    {
        public DateTime MeasurementDate { get; set; }
        public double Value { get; set; }
        public string? Note { get; set; }
    }

    public class CreateParamDto
    {
        public int EquipmentId { get; set; }
        public string? Name { get; set; }
        public double ReferenceValue { get; set; }
        public string? UnitCode { get; set; }
        public string? UnitName { get; set; }
        public double DeviationPlus { get; set; }
        public double DeviationMinus { get; set; }
        public string? Note { get; set; }
    }

    public class UpdateParamDto
    {
        public string? Name { get; set; }
        public double ReferenceValue { get; set; }
        public string? UnitCode { get; set; }
        public string? UnitName { get; set; }
        public double DeviationPlus { get; set; }
        public double DeviationMinus { get; set; }
        public string? Note { get; set; }
    }
}
