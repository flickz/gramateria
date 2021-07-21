import { publishToNetlify } from './../helpers'
import { Notyf } from 'notyf';


const noty = new Notyf({
    position: { y: 'top', x: 'center' }
})

export default [{
    id: 'undo',
    className: 'fa fa-undo icon-undo',
    command: function (editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.undo(1);
    },
    attributes: {
        title: 'Undo (CTRL/CMD + Z)'
    }
},
{
    id: 'redo',
    className: 'fas fa fa-repeat icon-redo',
    command: function (editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.redo(1);
    },
    attributes: {
        title: 'Redo (CTRL/CMD + SHIFT + Z)'
    }
},
{
    id: 'import',
    className: 'fa fa-edit',
    command: 'html-edit',
    attributes: {
        title: 'Import'
    }
}, {
    id: 'clean-all',
    className: 'fa fa-trash icon-blank',
    command: (editor, sender) => {
        if (sender) sender.set('active', false);
        if (confirm('Are you sure to clean the canvas?')) {
            editor.runCommand('core:canvas-clear');
            setTimeout(function () {
                localStorage.setItem('gjs-assets', '');
                localStorage.setItem('gjs-components', '');
                localStorage.setItem('gjs-html', '');
                localStorage.setItem('gjs-css', '');
                localStorage.setItem('gjs-styles', '');
                localStorage.setItem('gram-seo', '');
            }, 0);
        }
    },
    attributes: {
        title: 'Empty canvas'
    }
},
{
    id: 'publish',
    className: 'fa fa-globe',
    command: (editor, sender) => {
        sender.set('active', 0);

        let modal = editor.Modal;
        modal.setTitle('Deploy');
    
        const getSEO = localStorage.getItem('gram-seo');
        const { title, description, token } = getSEO ? JSON.parse(getSEO) : { title: '', description: '' };
    
        const form = `
            <form id="deploy-form" class="gram-form">
                <div class="form-group">
                    <label>Website Title <span class="required">*</span></label>
                    <input type="text" name="title" ${title ? 'value="' + title + '"' : ''} class="form-control">
                </div>
                <div class="form-group">
                    <label>Website Description <span class="required">*</span></label>
                    <textarea name="description" class="form-control">${description || ''}</textarea>
                </div>
                <div class="divider"></div>
                <h4>Netlify</h4>
                <div class="form-group">
                    <label>Netlify Token <span class="required">*</span> <a target="_blank" href="https://app.netlify.com/user/applications#personal-access-tokens"><span class="fa fa-question"></span></a></label>
                    <input type="text" name="token" ${token ? 'value="' + token + '"' : ''} class="form-control">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary"><span class="fa fa-upload"></span> Deploy</button>
                </div>
            </form>
            `;
    
        modal.setContent(form);
        modal.open({
            attributes: {
                class: 'form-modal',
            }
        });
    
        const deployForm = document.querySelector('#deploy-form');
        deployForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector('#deploy-form'));
            const SEO = Object.fromEntries(formData);
            const { title, description, token } = SEO;
            if (!title) {
                noty.error('Title is required');
                return;
            }
            if (!description) {
                noty.error('Description is required');
                return;
            }
            if (!token) {
                noty.error('Netlify token is required');
                return;
            }
            localStorage.setItem('gram-seo', JSON.stringify(SEO));
    
            let html = localStorage.getItem('gjs-html') || '';
            let css = localStorage.getItem('gjs-css') || '';
            const data = { token, title, description, html, css };
            publishToNetlify(data);
        })

    },
    attributes: {
        title: 'Deploy'
    }
},
{
    id: 'download',
    className: 'fa fa-download',
    command: (editor, sender) => {
        sender.set('active', 0);
        let modal = editor.Modal;
        modal.setTitle('Export');
    
        const getSEO = localStorage.getItem('gram-seo');
        const { title, description } = getSEO ? JSON.parse(getSEO) : { title: '', description: '' };
    
        const form = `
            <form id="export-form" class="gram-form">
                <div class="form-group">
                    <label>Website Title <span class="required">*</span></label>
                    <input type="text" name="title" ${title ? 'value="' + title + '"' : ''} class="form-control">
                </div>
                <div class="form-group">
                    <label>Website Description <span class="required">*</span></label>
                    <textarea name="description" class="form-control">${description || ''}</textarea>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary"><span class="fa fa-download"></span> Export</button>
                </div>
            </form>
            `;
    
        modal.setContent(form);
        modal.open({
            attributes: {
                class: 'form-modal',
            }
        });
    
        const exportForm = document.querySelector('#export-form');
        exportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector('#export-form'));
            const SEO = Object.fromEntries(formData);
            const { title, description } = SEO;
            if (!title) {
                noty.error('Title is required');
                return;
            }
            if (!description) {
                noty.error('Description is required');
                return;
            }
            localStorage.setItem('gram-seo', JSON.stringify(SEO));
    
            let html = localStorage.getItem('gjs-html') || '';
            let css = localStorage.getItem('gjs-css') || '';
            const data = { title, description, html, css };
            exportZip(data);
        })

    },
    attributes: {
        title: 'Download as zip'
    }
}
]