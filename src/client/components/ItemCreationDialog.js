import React from 'react';


export default function ItemCreationDialog() {
  return (
    <div>
      <Dialog open={openCreate} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleItemCreate}>
          <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the following information to add an item to the database:
            </DialogContentText>
            <TextField
              error={barcodeErr}
              helperText={barcodeErrMsg}
              autoFocus
              required
              value={barcode}
              margin="dense"
              label="EAN-13 Barcode"
              type="number"
              fullWidth
              disabled
            />
            <TextField
              required
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              onChange={e => setName(e.target.value)}
            />
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              onChange={handleCategoryPick}
            >
              {categories.map(value => (
                <MenuItem value={value.id}>{value.name}</MenuItem>
              ))}
            </Select>
            <TextField
              required
              margin="dense"
              id="packtype"
              label="Packaging Type"
              type="text"
              fullWidth
              onChange={e => setPacktype(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="packmat"
              label="Packaging Material"
              type="text"
              fullWidth
              onChange={e => setPackmat(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="origin"
              label="Origin"
              type="text"
              fullWidth
              onChange={e => setOrigin(e.target.value)}
            />
            <Typography gutterBottom className={classes.scoreText}>
              Score:
            </Typography>
            <Slider
              required
              defaultValue={10}
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              onChange={e => setScore(e.target.innerText)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Item
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
