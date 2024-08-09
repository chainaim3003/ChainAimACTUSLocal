import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ToolTip from './ToolTip'; // Assuming ToolTip is a custom component

class ContractForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            showLeg1: false,
            showLeg2: false,
            showUnderlying: false,
            contractType: 'SWAPS', // Default value, adjust as needed
            hasUnderlying: true, // Adjust as needed
            validated: false, // Track form validation state
            mandatoryFields: [], // Initialize with actual data
            nonRequiredFields: [], // Initialize with actual data
            leg1MandatoryFields: [], // Initialize with actual data
            leg1NonRequiredFields: [], // Initialize with actual data
            leg2MandatoryFields: [], // Initialize with actual data
            leg2NonRequiredFields: [], // Initialize with actual data
            underlyingMandatoryFields: [], // Initialize with actual data
            underlyingNonRequiredFields: [], // Initialize with actual data
            underlyingTypes: [], // Initialize with actual data
            underlyingType: '', // Initialize with actual data
            groups: [], // Initialize with actual data
            leg1Groups: [], // Initialize with actual data
            leg2Groups: [], // Initialize with actual data
            underlyingGroups: [] // Initialize with actual data
        };
    }

    toggleForm = () => {
        this.setState(prevState => ({ showForm: !prevState.showForm }));
    }

    toggleLeg1 = () => {
        this.setState(prevState => ({ showLeg1: !prevState.showLeg1 }));
    }

    toggleLeg2 = () => {
        this.setState(prevState => ({ showLeg2: !prevState.showLeg2 }));
    }

    toggleUnderlying = () => {
        this.setState(prevState => ({ showUnderlying: !prevState.showUnderlying }));
    }

    foldOptions = (index) => {
        const updatedGroups = this.state.groups.map((group, i) => 
            i === index ? { ...group, visible: !group.visible } : group
        );
        this.setState({ groups: updatedGroups });
    }

    foldLeg1Options = (index) => {
        const updatedLeg1Groups = this.state.leg1Groups.map((group, i) => 
            i === index ? { ...group, visible: !group.visible } : group
        );
        this.setState({ leg1Groups: updatedLeg1Groups });
    }

    foldLeg2Options = (index) => {
        const updatedLeg2Groups = this.state.leg2Groups.map((group, i) => 
            i === index ? { ...group, visible: !group.visible } : group
        );
        this.setState({ leg2Groups: updatedLeg2Groups });
    }

    foldUnderlyingOptions = (index) => {
        const updatedUnderlyingGroups = this.state.underlyingGroups.map((group, i) => 
            i === index ? { ...group, visible: !group.visible } : group
        );
        this.setState({ underlyingGroups: updatedUnderlyingGroups });
    }

    updateField = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    updateNonRequiredField = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleChangeLeg1Type = (e) => {
        this.setState({ leg1RequiredFields: { ...this.state.leg1RequiredFields, contractType: e.target.value } });
    }

    handleChangeLeg2Type = (e) => {
        this.setState({ leg2RequiredFields: { ...this.state.leg2RequiredFields, contractType: e.target.value } });
    }

    handleChangeUnderlyingType = (e) => {
        this.setState({ underlyingType: e.target.value });
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState({
            showForm: false,
            showLeg1: false,
            showLeg2: false,
            showUnderlying: false,
            validated: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ validated: true });
        // Add form submission logic here
    }

    handleExport = (e) => {
        e.preventDefault();
        // Add export logic here
    }

    render() {
        const { 
            showForm, showLeg1, showLeg2, showUnderlying, 
            contractType, hasUnderlying, validated, 
            mandatoryFields, nonRequiredFields, 
            leg1MandatoryFields, leg1NonRequiredFields, 
            leg2MandatoryFields, leg2NonRequiredFields, 
            underlyingMandatoryFields, underlyingNonRequiredFields, 
            underlyingTypes, underlyingType, 
            groups, leg1Groups, leg2Groups, underlyingGroups 
        } = this.state;

        const formClassName = validated ? 'validated' : '';

        return (
            <div className="contract-form">
                <Container fluid>
                    <Row>
                        <Col sm={12} className={`contract-main-wrapper ${formClassName}`} onClick={this.toggleForm}>
                            <span className="contract-title">{contractType}:</span>
                            <span className="contract-description">Contract Description</span>
                        </Col>
                    </Row>
                    {showForm &&
                        <Row>
                            <Col sm={5} className="required choices">
                                <div className="term-group-header">All fields below are mandatory to fill in:</div>
                                <div className="field-wrapper">
                                    <div className="items-group">
                                        <Container fluid>
                                            <Row>
                                                {mandatoryFields.map((m, groupId) => (
                                                    <Col key={`term_wrapper${groupId}`} sm={6} className="item nopadding">
                                                        <div className="input-container">
                                                            <label className="item-labels" htmlFor={m.name}>{m.name}</label>
                                                            <div className="input-wrapper">
                                                                <input 
                                                                    id={m.identifier}
                                                                    title={`Required Field`} 
                                                                    placeholder='...' 
                                                                    value={this.state[m.identifier]}
                                                                    onChange={this.updateField}
                                                                    className="item-fields" 
                                                                    type="text" 
                                                                />
                                                                <ToolTip description={m.description} />
                                                            </div>                                        
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={7} className="optional choices">
                                <div className="term-group-header">Below are your Optional choices</div>
                                {groups.map((group, index) => (
                                    <div key={`term_wrapper${index}`} className="term-wrapper">
                                        <div id={group.shortName} className="items-group">
                                            <div className="item-header" onClick={() => this.foldOptions(index)}>{group.group}</div>
                                            {group.visible &&
                                                <Container fluid>
                                                    <Row>
                                                        {group.Items.map((item, index) => (
                                                            <Col key={`key${item.identifier}`} sm={4} className="item nopadding">
                                                                <div className="input-container">
                                                                    <label className="item-labels" htmlFor={item.name}>{item.name}</label>
                                                                    <div className="input-wrapper term">
                                                                        <input 
                                                                            id={item.identifier} 
                                                                            group={item.group}
                                                                            title={`Optional Choice`} 
                                                                            placeholder={`...`}
                                                                            value={this.state[item.identifier]}
                                                                            onChange={this.updateNonRequiredField}
                                                                            className="item-fields"
                                                                            type="text" 
                                                                        />
                                                                        <ToolTip description={item.description} />
                                                                    </div>                                        
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </Container>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    }
                    {hasUnderlying && contractType === "SWAPS" &&
                        <>
                            <Row>
                                <Col sm={12} className={`contract-main-wrapper ${formClassName}`} onClick={this.toggleLeg1}>
                                    <span className="contract-title">Leg 1:</span>
                                    <span className="contract-description">This contract constitutes Leg 1 of the Swap</span>
                                </Col>
                            </Row>
                            {showLeg1 &&
                                <Row>
                                    <Col sm={5} className="required choices">
                                        <div className="term-group-header">All fields below are mandatory to fill in:</div>
                                        <div className="field-wrapper">
                                            <div className="items-group">
                                                <Container fluid>
                                                    <Row>
                                                        {leg1MandatoryFields.map((m, groupId) => (
                                                            m.identifier === "contractType" ? (
                                                                <Col key={`term_wrapper${groupId}`} sm={6} className="item nopadding">
                                                                    <div className="input-container">
                                                                        <label className="item-labels" htmlFor={m.name}>{m.name}</label>
                                                                        <div className="input-wrapper">
                                                                            <select 
                                                                                id={m.identifier}
                                                                                title={`Required Field`} 
                                                                                value={this.state.leg1RequiredFields.contractType} 
                                                                                onChange={this.handleChangeLeg1Type} 
                                                                                className="item-fields" 
                                                                            >
                                                                                {underlyingTypes.map(type => (
                                                                                    <option key={type} value={type}>
                                                                                        {type}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>                                        
                                                                    </div>
                                                                </Col>
                                                            ) : (
                                                                <Col key={`term_wrapper${groupId}`} sm={6} className="item nopadding">
                                                                    <div className="input-container">
                                                                        <label className="item-labels" htmlFor={m.name}>{m.name}</label>
                                                                        <div className="input-wrapper">
                                                                            <input 
                                                                                id={m.identifier}
                                                                                title={`Required Field`} 
                                                                                placeholder='...' 
                                                                                value={this.state.leg1RequiredFields[m.identifier]}
                                                                                onChange={this.updateField}
                                                                                className="item-fields" 
                                                                                type="text" 
                                                                            />
                                                                            <ToolTip description={m.description} />
                                                                        </div>                                        
                                                                    </div>
                                                                </Col>
                                                            )
                                                        ))}
                                                    </Row>
                                                </Container>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={7} className="optional choices">
                                        <div className="term-group-header">Below are your Optional choices</div>
                                        {leg1Groups.map((group, index) => (
                                            <div key={`term_wrapper${index}`} className="term-wrapper">
                                                <div id={group.shortName} className="items-group">
                                                    <div className="item-header" onClick={() => this.foldLeg1Options(index)}>{group.group}</div>
                                                    {group.visible &&
                                                        <Container fluid>
                                                            <Row>
                                                                {group.Items.map((item, index) => (
                                                                    <Col key={`key${item.identifier}`} sm={4} className="item nopadding">
                                                                        <div className="input-container">
                                                                            <label className="item-labels" htmlFor={item.name}>{item.name}</label>
                                                                            <div className="input-wrapper term">
                                                                                <input 
                                                                                    id={item.identifier} 
                                                                                    group={item.group}
                                                                                    title={`Optional Choice`} 
                                                                                    placeholder={`...`}
                                                                                    value={this.state.leg1NonRequiredFields[item.identifier]}
                                                                                    onChange={this.updateNonRequiredField}
                                                                                    className="item-fields"
                                                                                    type="text" 
                                                                                />
                                                                                <ToolTip description={item.description} />
                                                                            </div>                                        
                                                                        </div>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Container>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                            }
                        </>
                    }
                    {hasUnderlying && contractType !== "SWAPS" &&
                        <>
                            <Row>
                                <Col sm={12} className={`contract-main-wrapper ${formClassName}`} onClick={this.toggleUnderlying}>
                                    <span className="contract-title">Underlying:</span>
                                    <span className="contract-description">This contract constitutes the underlying</span>
                                </Col>
                            </Row>
                            {showUnderlying &&
                                <Row>
                                    <Col sm={5} className="required choices">
                                        <div className="term-group-header">All fields below are mandatory to fill in:</div>
                                        <div className="field-wrapper">
                                            <div className="items-group">
                                                <Container fluid>
                                                    <Row>
                                                        {underlyingMandatoryFields.map((m, groupId) => (
                                                            m.identifier === "contractType" ? (
                                                                <Col key={`term_wrapper${groupId}`} sm={6} className="item nopadding">
                                                                    <div className="input-container">
                                                                        <label className="item-labels" htmlFor={m.name}>{m.name}</label>
                                                                        <div className="input-wrapper">
                                                                            <select 
                                                                                id={m.identifier}
                                                                                title={`Required Field`} 
                                                                                value={underlyingType} 
                                                                                onChange={this.handleChangeUnderlyingType} 
                                                                                className="item-fields" 
                                                                            >
                                                                                {underlyingTypes.map(type => (
                                                                                    <option key={type} value={type}>
                                                                                        {type}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>                                        
                                                                    </div>
                                                                </Col>
                                                            ) : (
                                                                <Col key={`term_wrapper${groupId}`} sm={6} className="item nopadding">
                                                                    <div className="input-container">
                                                                        <label className="item-labels" htmlFor={m.name}>{m.name}</label>
                                                                        <div className="input-wrapper">
                                                                            <input 
                                                                                id={m.identifier}
                                                                                title={`Required Field`} 
                                                                                placeholder='...' 
                                                                                value={this.state.underlyingRequiredFields[m.identifier]}
                                                                                onChange={this.updateField}
                                                                                className="item-fields" 
                                                                                type="text" 
                                                                            />
                                                                            <ToolTip description={m.description} />
                                                                        </div>                                        
                                                                    </div>
                                                                </Col>
                                                            )
                                                        ))}
                                                    </Row>
                                                </Container>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={7} className="optional choices">
                                        <div className="term-group-header">Below are your Optional choices</div>
                                        {underlyingGroups.map((group, index) => (
                                            <div key={`term_wrapper${index}`} className="term-wrapper">
                                                <div id={group.shortName} className="items-group">
                                                    <div className="item-header" onClick={() => this.foldUnderlyingOptions(index)}>{group.group}</div>
                                                    {group.visible &&
                                                        <Container fluid>
                                                            <Row>
                                                                {group.Items.map((item, index) => (
                                                                    <Col key={`key${item.identifier}`} sm={4} className="item nopadding">
                                                                        <div className="input-container">
                                                                            <label className="item-labels" htmlFor={item.name}>{item.name}</label>
                                                                            <div className="input-wrapper term">
                                                                                <input 
                                                                                    id={item.identifier} 
                                                                                    group={item.group}
                                                                                    title={`Optional Choice`} 
                                                                                    placeholder={`...`}
                                                                                    value={this.state.underlyingNonRequiredFields[item.identifier]}
                                                                                    onChange={this.updateNonRequiredField}
                                                                                    className="item-fields"
                                                                                    type="text" 
                                                                                />
                                                                                <ToolTip description={item.description} />
                                                                            </div>                                        
                                                                        </div>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </Container>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                            }
                        </>
                    }
                    <Row>
                        <Col sm={5} className="text-right">
                        </Col>
                        <Col sm={7} className={(validated) ? `text-left` : `text-left`}>
                            <input type="reset" value="RESET" className="mr-2" onClick={this.handleReset} />
                            <input type="submit" value="SEND" className="mr-2" onClick={this.handleSubmit} />
                            <input type="submit" value="EXPORT TERMS" onClick={this.handleExport} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ContractForm;
