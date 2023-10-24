const todasCheckbox = document.querySelector('input[value="Todas"]');
const isChecked = todasCheckbox.checked;

if (isChecked) {
  // Si "Todas" está marcada, marcar todas las categorías
  const selectedCategoriaIds = categorias.map(categoria => categoria.id);
  setProductState({ ...productState, categoriasSeleccionadas: selectedCategoriaIds });
} else {
  // Si "Todas" no está marcada, desmarcar todas las categorías
  setProductState({ ...productState, categoriasSeleccionadas: [] });





}


<input
  style={{
    width: '20px',
    height: '20px',
  }}
  type="checkbox"
  value="Todas" // Puedes usar un valor específico para identificar la categoría "Todas"
  checked={
    productState.categoriasSeleccionadas.length === categorias.length // Marcar si todas las categorías están seleccionadas
  }
  onChange={() => handleCheckboxChangeAll()}
/>
<h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
  Todas
</h5>