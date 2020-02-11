<script>
  import { onMount } from 'svelte'
  import CodeMirror from 'codemirror'
  
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/jsx/jsx';


  export let initialContent
  export let id
  export let readOnly

  onMount(() => {
    const node = document.getElementById(`editor_${id}`)
    const codeMirror = CodeMirror(node, {
      mode: {
        name: 'javascript',
      },
      value: initialContent,
      lineNumbers: true,
      theme: 'default',
      readOnly: !!readOnly,
      lineWrapping: true,
      viewportMargin: Infinity,
      indentUnit: 2,
    });
    CodeMirror
  })

</script>

<style>
  .editor_container {
    padding: 15px;
    background-color: #fff;
    height: auto;
    width: 100%;
    border-radius: 5px;
    box-shadow: var(--box-shadow-center);
    overflow: auto;
  }
</style>

<svelte:head>
  <style>
  .CodeMirror-selected {
    background: var(--selectionColor);
  }

  .CodeMirror {
    height: auto;
    font-family: 'Roboto Mono';
  }
  

  .CodeMirror-scroll {
    height: auto;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .CodeMirror-code {
    font-family: 'Roboto Mono';
    font-size: .8em;
    width: 100%;
  }

  .CodeMirror-gutters {
    background-color: #fff;
    border-right: 0;
  }
  </style>
</svelte:head>

<div class="editor_container">
  <div id={`editor_${id}`} />
</div>

