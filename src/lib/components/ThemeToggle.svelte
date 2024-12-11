<script lang="ts">
    //sets theme
    let theme = $state('modern');
    //setes theme to the document
    $effect(() => {
        document.body.setAttribute('data-theme', theme);
    });
    //sets button text
    let buttonText = $derived(theme === 'modern' ? 'Modern Theme' : 'Web 2.0 Theme');
    
    function toggleTheme() {
        theme = theme === 'modern' ? 'web2.0' : 'modern';
    }
    </script>
    
    <button 
        class="theme-toggle" 
        onclick={toggleTheme}
        aria-label="Toggle theme"
    >
        {buttonText}
    </button>
    <h1>Theme: {theme}</h1>
    
    <style lang="scss">
    /* Add your styles here */
    </style>
    