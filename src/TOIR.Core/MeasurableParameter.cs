
using System;

namespace TOIR.Core
{
    public class MeasurableParameter
    {
        public int Id { get; set; }
        public int EquipmentId { get; set; }
        public string? Name { get; set; }
        public double ReferenceValue { get; set; }
        public string? UnitCode { get; set; }
        public string? UnitName { get; set; }
        public double DeviationPlus { get; set; }
        public double DeviationMinus { get; set; }
        public string? Note { get; set; }
        public Equipment? Equipment { get; set; }
        public List<ParameterMeasurement> Measurements { get; set; } = new();
    }

    public class ParameterMeasurement
    {
        public int Id { get; set; }
        public int ParameterId { get; set; }
        public DateTime MeasurementDate { get; set; }
        public double Value { get; set; }
        public string? Note { get; set; }
        public MeasurableParameter? Parameter { get; set; }
    }
}
