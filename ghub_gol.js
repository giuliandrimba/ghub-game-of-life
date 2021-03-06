(function()
{
	var Cell = function(state, dom)
	{
		this.dom = dom;
		this.state = state;
		this.previous = state;

		this.draw = function()
		{
			if(!this.dom)
				return;

			if(this.state === 0)
				this.dom.style.fill = "#eeeeee"
			else
				this.dom.style.fill = "#1e6823"
		}
	}

	var GOL = function()
	{
		var cells = [];
		var groups = $(".calendar-graph").find("g");
		var columns = groups.length
		var rows = 7;
		var frame = 0;
		var frameCount = 10;

		var rAF = undefined;

		this.dispose = function()
		{
			window.cancelAnimationFrame(rAF);
			var cells = [];
		}


		function setup()
		{
			for(var x =0; x < columns; x++)
			{
				var y = 0;
				cells[x] = [];

				for(var y =0; y < rows; y++)
				{
					state = Math.round(Math.random(2));
					dom = $(groups[x]).find("rect")[y];
					cells[x][y] = new Cell(state, dom);
				}
			}
		}

		setup()
		update();

		function update()
		{
			rAF = window.requestAnimationFrame(update);
			frame++;
			if(frame > frameCount)
			{
				generate()
				frame = 0;
				draw()
			}
		}

		function generate()
		{
			for(var x = 1; x < cells.length; x++)
			{
				var row = cells[x]
				for(var y = 0; y < row.length; y++)
				{
					setState(x, y, cells.length - 1, row.length - 1);
				}
			}
		}

		function setState(x, y, totalColumns, totalRows)
		{
			var neighbors = 0;
			cell = cells[x][y];
			cell.previous = cell.state;

			if(x > 0 && y > 0 && x < totalColumns && y < totalRows)
			{
				if (cells[x-1][y-1].previous == 1) neighbors++;
				if (cells[x][y-1].previous == 1) neighbors++;
				if (cells[x+1][y-1].previous == 1) neighbors++;

				if (cells[x-1][y].previous   == 1) neighbors++;
				if (cells[x+1][y].previous   == 1) neighbors++;

				if (cells[x-1][y+1].previous == 1) neighbors++;
				if (cells[x  ][y+1].previous == 1) neighbors++;
				if (cells[x+1][y+1].previous == 1) neighbors++;
			}

			if(cell.previous === 1 && neighbors < 2)
				cell.state = 0

			else if(cell.previous === 1 && neighbors > 3)
				cell.state = 0

			else if(cell.previous === 0 && neighbors === 3)
				cell.state = 1

		}

		function draw()
		{
			for(var x = 0; x < cells.length; x++)
			{
				var row = cells[x];

				for(var y = 0; y < row.length; y++)
				{
					c = cells[x][y]

					c.draw()
				}
			}
		}
	}

	if(window.GITHUB_GOL)
		window.GITHUB_GOL.dispose()

	window.GITHUB_GOL = new GOL();

})()
