/* CONTENT EDITOR */

import React from 'react'
import 'trumbowyg/dist/trumbowyg.js'
import 'trumbowyg/dist/ui/trumbowyg.min.css'
import ReactBootstrap from 'react-bootstrap'
import $ from 'jquery'

export default class ContentEditor extends React.Component {
    constructor (props) {
        super(props)
        this.isClosing = false
        this.state = { showHtmlDialog: false, html: props.content }
        this.showHtmlDialog = toggle => { this.setState({ showHtmlDialog: toggle }, () => { if (toggle) this.initEditor() }) }
        this.htmlEditor_change = e => this.setState({ html: e.target.value })
        this.focused = false
    }

    componentWillReceiveProps (newProps) {
        if (!this.state.showHtmlDialog && !this.focused && newProps.content !== this.state.html) {
            this.setState({ html: newProps.content })
        }
        return false
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (this.state.showHtmlDialog && !this.isClosing) {
            return false
        }
        return true
    }

    initEditor () {
        $(this.refs.trumbowyg).trumbowyg({ svgPath: false })
        $(this.refs.trumbowyg).trumbowyg('html', this.state.html.replace(/^<div>/, '').replace(/<\/div>$/, ''))
        $('.trumbowyg-viewHTML-button').addClass('fa fa-code').text('')
        $('.trumbowyg-undo-button').addClass('fa fa-undo').text('')
        $('.trumbowyg-redo-button').addClass('fa fa-repeat').text('')
        $('.trumbowyg-formatting-button').addClass('fa fa-paragraph').text('')
        $('.trumbowyg-strong-button').addClass('fa fa-bold').text('')
        $('.trumbowyg-em-button').addClass('fa fa-italic').text('')
        $('.trumbowyg-del-button').addClass('fa fa-strikethrough').text('')
        $('.trumbowyg-superscript-button').addClass('fa fa-superscript').text('')
        $('.trumbowyg-subscript-button').addClass('fa fa-subscript').text('')
        $('.trumbowyg-link-button').addClass('fa fa-link').text('')
        $('.trumbowyg-insertImage-button').addClass('fa fa-image').text('')
        $('.trumbowyg-justifyLeft-button').addClass('fa fa-align-left').text('')
        $('.trumbowyg-justifyCenter-button').addClass('fa fa-align-center').text('')
        $('.trumbowyg-justifyRight-button').addClass('fa fa-align-right').text('')
        $('.trumbowyg-justifyFull-button').addClass('fa fa-align-justify').text('')
        $('.trumbowyg-unorderedList-button').addClass('fa fa-list-ul').text('')
        $('.trumbowyg-orderedList-button').addClass('fa fa-list-ol').text('')
        $('.trumbowyg-horizontalRule-button').addClass('fa fa-minus').text('')
        $('.trumbowyg-removeformat-button').addClass('glyphicon glyphicon-ban-circle').text('')
        $('.trumbowyg-fullscreen-button').addClass('glyphicon glyphicon-fullscreen').text('')
    }

    htmlEditorCloser (isSaving) {
        if (isSaving) {
            const content = $(this.refs.trumbowyg).trumbowyg('html')
            this.props.contentEditorValue(content)
            this.isClosing = true
            this.setState({ html: content })
        } else { this.isClosing = true }
        this.showHtmlDialog(false)
    }

    onFocus (isFocused) {
        this.focused = isFocused
    }

    render () {
        const { Button, Modal } = ReactBootstrap.Button
        return (

            <div className="ContentEditor" style={{ position: 'relative' }}>
                <div className="well" onClick={this.showHtmlDialog.bind(this, true)}>
                    <iframe style={{ width: '100%', height: '100%', backgroundColor: '#fff' }} srcDoc={(this.props.headHtml || '') + this.state.html} />
                    <Button onClick={this.showHtmlDialog.bind(this, true)}><span className="fa fa-pencil"></span> Edit</Button>
                </div>
                <Modal show={this.state.showHtmlDialog} onHide={this.htmlEditorCloser.bind(this, false)}>
                    <Modal.Header closeButton>
                        <h3>HTML Editor</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <div ref='trumbowyg'></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.htmlEditorCloser.bind(this, true)}>OK</Button> <Button onClick={this.htmlEditorCloser.bind(this, false)} className="pull-right">Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}
