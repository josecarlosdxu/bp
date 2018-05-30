---
title:          table
categories:     nmss
scss:           ' scss/nm/modules/_table.scss'


---

Extensión de la tabla normal de html

## HTML
```
<table class="table">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>

```
##Resultado

<div class="msgBox msgBox--warning u-mgb">A todas las tablas se le ha añadido la clase .table-tbody--stripped para ayudar a su visualización en la documentación</div>

<table class="table">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>

##Variaciones




__table--condensed__ / Menos padding en las celdas

<table class="table table--condensed">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>

__table--ultracondensed__ / Versión ultracondensada de la tabla

<table class="table table--ultracondensed">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>


__table--border__ / Borde visibles

<table class="table table--border">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>


__table--interactive__ / Celdas que responden al :hover

<table class="table table--interactive">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>


__table--indented__ / Para anidar visualmente tablas contiguas

<table class="table table--indented">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>


##Variaciones de fila

__table-tr--selected__ / Marca una fila como seleccionada

<table class="table">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr table-tr--selected">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>

__table-tr--selected__ / Marca una fila como seleccionada

<table class="table">
	<caption class="table-caption">Caption</caption>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr table-tr--selected">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>


__table-actionGroup__ / Grupo de acciones para tablas seleccionadas, contiene uno o más a.table-action

<table class="table">
	<caption class="table-caption">Caption</caption>
	<tr class="table-tr">
		<td colspan="100">
			<div class="table-actionGroup"  style="display: block;">
				<a href="descarga.zip" target="_blank" class="table-action"><i class="icon table-tableIcon fa-cloud-download"></i>Descargar PDF</a>
			</div>
		</td>
	</tr>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr table-tr--selected">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>


__table-actionGroup__ / Grupo de acciones para tablas seleccionadas, contiene uno o más a.table-action

<table class="table">
	<caption class="table-caption">Caption</caption>
	<tr class="table-tr">
		<td colspan="100">
			<div class="table-actionGroup" style="display: block;">
				<a href="descarga.zip" target="_blank" class="table-action"><i class="icon table-tableIcon fa-cloud-download"></i>Descargar PDF</a>
			</div>
		</td>
	</tr>
	<thead class="table-thead ">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--number">number</td>
			<td class="table-item table-item--boolean">Boolean</td>
			<td class="table-item table-item--number">number</td>
		</tr>
	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr table-tr--selected">
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>

__tabla filtrada__ / usando  una combinación de modificadores podemos conseguir una tabla con el header a modo de filtros, con selección de filas, etc.


<table class="table">
	<caption class="table-caption">Caption</caption>
	<tr class="table-tr">
		<td colspan="100">
			<div class="table-actionGroup" style="display: block;">
				<a href="descarga.zip" target="_blank" class="table-action"><i class="icon table-tableIcon fa-cloud-download"></i>Descargar PDF</a>
			</div>
		</td>
	</tr>

	<thead class="table-thead  table-thead--borderless">
		<tr class="table--tr table-tr--sort">
			<td class="table-th table-item table-item--handler"></td>
			<th class="table-th table-item u-xs-10">Nº Factura <i class="icon icon-sort fa fa-caret-down"></i></th>
			<th class="table-th table-item u-xs-15">Fecha <i class="icon icon-sort fa fa-caret-down"></i></th>
			<th class="table-th table-item u-xs-10">CIF <i class="icon icon-sort fa fa-caret-down"></i></th>
			<th class="table-th table-item u-xs-15">Forma de Pago<i class="icon icon-sort fa fa-caret-down"></i></th>
		</tr>

		<tr class="table-tr  table-tr--filters">
			<th class="table-th table-item table-item--handler">
				<input type="checkbox" class="form-checkbox">
			</th>
			<th class="table-th table-item table-item--number u-xs-5">
				<input class="form-input form-input--collapse" type="text">
			</th>
			<th class="table-th table-item u-xs-20">
				<input class="form-input form-input--collapse" type="text">
			</th>
			<th class="table-th table-item u-xs-10">
				<input class="form-input form-input--collapse" type="text">
			</th>
			<th class="table-th table-item u-xs-10">
				<select name="" id="" class="form-select form-select--collapse">
					<option value="">--</option>
				</select>
			</th>
			<th class="table-th table-item table-item--number u-xs-5">

				<input class="form-input form-input--collapse" type="text">
			</th>
		</tr>


		<!-- table actions -->
		<tr class="table-tr">
			<td colspan="100">
				<div class="table-actionGroup">
					<a href="descarga.zip" target="_blank" class="table-action"><i class="icon table-tableIcon fa-cloud-download"></i>Descargar PDF</a>
				</div>
			</td>
		</tr>



	</thead>
	<tbody class="table-tbody  table-tbody--stripped">
		<tr class="table-tr">
			<td class="table-th table-item table-item--handler" ><input type="checkbox" class="form-checkbox u-locked-evts"><i class="icon icon-sort fa fa-pencil fa-fw"></i></td>
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
		<tr class="table-tr table-tr--selected">
			<td class="table-th table-item table-item--handler" ><input type="checkbox" class="form-checkbox u-locked-evts"><i class="icon icon-sort fa fa-pencil fa-fw"></i></td>
			<td class="table-item">item</td>
			<td class="table-item table-item--number">0000001</td>
			<td class="table-item table-item--numberNegative">000001</td>
			<td class="table-item table-item--boolean">Yes/No</td>
			<td class="table-item table-item--numberBlue">000001</td>
		</tr>
	</tbody>
	<tfoot class="table-tfoot  ">
		<tr class="table-tr">
			<td colspan="100" class="table-item table-item--numberTotal">Total: 00005</td>
		</tr>
	</tfoot>
</table>

## SCSS

{{embed scss}}


