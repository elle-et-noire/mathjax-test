window.MathJax = {
  loader: {load: ['[tex]/physics', '[tex]/mathtools', '[tex]/color', '[tex]/upgreek', '[tex]/centernot', '[tex]/noerrors']},
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: { '[+]': ['physics', 'mathtools', 'color', 'upgreek', 'centernot', 'noerrors'] },
    color: {
      padding: '5px',
      borderWidth: '2px',
    },
    macros: {
      parn: ["\\biggl(#1\\biggr)", 1],
      sqbr: ["\\biggl[#1\\biggr]", 1],
      pfrac: ["\\biggl(\\dfrac{#1}{#2}\\biggr)", 2],
      ds: "\\displaystyle",
      C: '{\\mathbb C}',
      R: '{\\mathbb R}',
      Q: '{\\mathbb Q}',
      Z: '{\\mathbb Z}',
      ssqrt: ['\\sqrt{\\smash[b]{\\mathstrut #1}}', 1],
      tcdegree: ['\\unicode{xb0}'],
      tccelsius: ['\\unicode{x2103}'],
      tcperthousand: ['\\unicode{x2030}'],
      tcmu: ['\\unicode{x3bc}'],
      tcohm: ['\\unicode{x3a9}'],
      bm: ['\\boldsymbol{#1}', 1],
      ol: ['\\overline{#1}', 1],
      ul: ['\\underline{#1}', 1],
      ub: ['\\underbrace{#1}', 1],
      ubt: ['\\underbrace{#1}_{\\text{#2}}', 2],
      i: '{\\mathrm{i}}',
      e: '{\\mathrm{e}}',
      ve: '{\\varepsilon}',
      slashed: ['{{#1\\!\\!\\!/}}', 1],
    },
    physics: {
      italicdiff: true,
      arrowdel: false,
    },
    tags: 'ams',
    tagSide: 'right',
    tagIndent: '0.8em', /* 数式と式番号の距離がtagIndentで指定した距離よりも短くならないように調整 */
    processRefs: true,
    processEscapes: true,
    autoload: {
      color: [],
      colorV2: ['color']
    },
  },
  svg: {
    fontCache: 'global'
  },
  chtml: {
    displayAlign: 'left',
    displayIndent: '2em',
    mtextInheritFont: true, /* 数式中の \text{} を本文と同じフォントにする */
    matchFontHeight: false,
  },
  startup: {
    ready: () => {
      console.log('MathJax is loaded, but not yet initialized');
      MathJax.startup.defaultReady();
      console.log('MathJax is initialized, and the initial typeset is queued');
      MathJax.startup.promise.then(() => {
        console.log('MathJax initial typesetting complete');
      });
    }
  },
  options: {
    renderActions: {
      find_script_mathtex: [10, function (doc) {
        for (const node of document.querySelectorAll('script[type^="math/tex"]')) {
          const display = !!node.type.match(/; *mode=display/);
          const math = new doc.options.MathItem(node.textContent, doc.inputJax[0], display);
          const text = document.createTextNode('');
          node.parentNode.replaceChild(text, node);
          math.start = {node: text, delim: '', n: 0};
          math.end = {node: text, delim: '', n: 0};
          doc.math.push(math);
        }
      }, '']
    }
  },
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  // script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-mml-chtml.js';
  script.async = true;
  document.head.appendChild(script);
})();
