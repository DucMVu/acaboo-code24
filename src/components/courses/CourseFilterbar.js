import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUniversities } from '../../actions/universities'
import { getStudies, setSelectedStudy, setSelectedUniversity, clearSelectedStudy } from '../../actions/studies'
import { getCourses } from '../../actions/courses'
import Filter from './CourseFilter'

class CourseFilter extends PureComponent {

    constructor(props) {
        super(props);

        this.handleUniversitySelect = this.handleUniversitySelect.bind(this);
        this.handleStudySelect = this.handleStudySelect.bind(this);
    }

    state = {
        university: { id: null, name: null },
        study: { id: null, name: null }
    }

    componentWillMount() {
        this.props.getUniversities()
        this.props.selectedUniversity && this.props.getStudies(this.props.selectedUniversity.id)
    }

    async handleUniversitySelect(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const id = event.target.options[selectedIndex].getAttribute('id')
        await this.setState({
            university: { id: id, name: event.target.value }
        });
        this.props.setSelectedUniversity(this.state.university)
        this.props.getStudies(id)
        await this.props.clearSelectedStudy()
    }

    async handleStudySelect(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const id = event.target.options[selectedIndex].getAttribute('id')
           await this.setState({
                 study: { id, name: event.target.value} });
        await this.props.setSelectedStudy(this.state.study)
        this.props.history.push(`/courses/${this.props.university.name}/${this.props.study.name}`)

    }


    render() {


        return this.props.universities === null ? <p>Loading ...</p> :
            <Filter
                handleUniversitySelect={this.handleUniversitySelect}
                handleStudySelect={this.handleStudySelect}
                universities={this.props.universities}
                university={this.state.university}
                study={this.state.study}
                studies={this.props.studies}

            />
    }
}

const mapStateToProps = state => ({
    universities: state.universities,
    university: state.selectedUniversity,
    studies: state.studies,
    study: state.selectedStudy,
    selectedUniversity: state.selectedUniversity,
    selectedStudy: state.selectedStudy

})


export default connect(mapStateToProps, { getUniversities, getStudies, setSelectedStudy, getCourses, setSelectedUniversity, clearSelectedStudy })(CourseFilter)

