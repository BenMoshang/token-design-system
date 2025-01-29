<section class="spacing">
	<section class="spacing--x1">
		<div class="box"></div>
		<div class="box"></div>
	</section>
</section>

<!-- <section class="spacing--x1">
		<div class="box"></div>
		<div class="box"></div>
	</section>
	<section class="spacing--x2">
		<div class="box"></div>
		<div class="box"></div>
	</section>
	<section class="spacing--x3">
		<div class="box"></div>
		<div class="box"></div>
	</section>
	<section class="spacing--h1">
		<div class="box"></div>
		<div class="box"></div>
	</section>
	<section class="spacing--2xl">
		<div class="box"></div>
		<div class="box"></div>
	</section>
	<section class="spacing--3xl">
		<div class="box"></div>
		<div class="box"></div>
	</section> 
	
	-->
<style lang="scss">
	.spacing {
		& > * {
			display: flex;
			flex-direction: column;
		}
		&--x1 {
			gap: get-static-spacing('x1');
		}
		&--x2 {
			gap: get-static-spacing('x2');
		}
		&--x3 {
			gap: get-static-spacing('x3');
		}
		&--h1 {
			gap: get-static-spacing('x4');
		}
		&--x5 {
			gap: get-static-spacing('x5');
		}
		&--x6 {
			gap: get-static-spacing('x6');
		}
		&--x7 {
			gap: get-static-spacing('x7');
		}
		&--x8 {
			gap: get-static-spacing('x8');
		}
		&--x9 {
			gap: get-static-spacing('x9');
		}
		&--x10 {
			gap: get-static-spacing('x10');
		}
	}
	.box {
		outline: 1px dashed red;
		width: 100px;
		height: 100px;
	}
</style>
