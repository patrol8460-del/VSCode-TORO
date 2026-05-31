
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TOIR.Core.Data;
using TOIR.Core.Models;

namespace TOIR.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NeedsController : ControllerBase
{
    private readonly AppDbContext _context;

    public NeedsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Needs>>> GetNeeds()
    {
        return await _context.Needs.ToListAsync();
    }
}
