/**
 * React Component .

 */
import SegmentFooterMultiMatches from "./SegmentFooterMultiMatches";

let React = require('react');
let SegmentConstants = require('../../constants/SegmentConstants');
let SegmentStore = require('../../stores/SegmentStore');
// let SegmentTabMatches = require('./SegmentFooterTabMatches').default;
let SegmentTabConcordance = require('./SegmentFooterTabConcordance').default;
let SegmentTabGlossary = require('./SegmentFooterTabGlossary').default;
let SegmentTabConflicts = require('./SegmentFooterTabConflicts').default;
let SegmentTabRevise = require('./SegmentFooterTabRevise').default;
class SegmentFooter extends React.Component {

    constructor(props) {
        super(props);
        let tMLabel;
        if ( config.mt_enabled ) {
            tMLabel =  'Translation Matches';
        }
        else {
            tMLabel = 'Translation Matches' + " (No MT) ";
        }
        let hideMatches = this.getHideMatchesCookie();
        let tabs = {
            matches: {
                label: tMLabel,
                code : 'tm',
                tab_class : 'matches',
                enabled: false,
                visible: false,
                open: false,
                elements: []
            },
            concordances: {
                label: 'TM Search',
                code : 'cc',
                tab_class : 'concordances',
                enabled : false,
                visible : false,
                open : false,
                elements : []
            },
            glossary: {
                label : 'Glossary',
                code : 'gl',
                tab_class : 'glossary',
                enabled : false,
                visible : false,
                open : false,
                elements : []
            },
            alternatives: {
                label : 'Translation conflicts',
                code : 'al',
                tab_class : 'alternatives',
                enabled : !!(this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0),
                visible : !!(this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0),
                open : !!(this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0),
                elements : []
            },
            messages: {
                label : 'Messages',
                code : 'notes',
                tab_class : 'segment-notes',
                enabled : false,
                visible : false,
                open : false,
                elements : []
            },
            multiMatches: {
                label: 'Crosslanguage Matches',
                code : 'cl',
                tab_class : 'cross-matches',
                enabled: !!(UI.crossLanguageSettings && UI.crossLanguageSettings.primary),
                visible: !!(UI.crossLanguageSettings && UI.crossLanguageSettings.primary),
                open: false,
                elements: []
            },
            review : {
                label : 'Revise',
                code : 'review',
                tab_class : 'review',
                enabled : false,
                visible : false,
                open : false,
                elements : []
            }
        };

        this.state = {
            tabs: this.registerTabInit(tabs, SegmentStore._footerTabsConfig.toJS()),
            hideMatches: hideMatches
        };
        this.registerTab = this.registerTab.bind(this);
        this.modifyTabVisibility = this.modifyTabVisibility.bind(this);
        this.getTabContainer = this.getTabContainer.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.openTab = this.openTab.bind(this);
        this.addTabIndex = this.addTabIndex.bind(this);
        // this.setDefaultTabOpen = this.setDefaultTabOpen.bind(this);
    }

    registerTabInit(tabs,configs) {
        let allTabs = tabs;
        for(let key in configs){
            allTabs[key].open = (this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0) ? false : configs[key].open;
            allTabs[key].visible = configs[key].visible;
            allTabs[key].enabled = true;
        }
        if ( this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0 )  {
            tabs.alternatives.visible = !!(this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0);
            tabs.alternatives.enabled = !!(this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0);
            tabs.alternatives.open = !!(this.props.segment.alternatives && Object.size(this.props.segment.alternatives) > 0);
        }
        return allTabs
    }

    registerTab(tabs,configs) {
        let allTabs = _.cloneDeep(this.state.tabs);
        for(let key in configs){
            allTabs[key].open = configs[key].open;
            allTabs[key].visible = configs[key].visible;
            allTabs[key].enabled = true;
        }
        this.setState({
            tabs: allTabs
        });
    }

    modifyTabVisibility(tabName, visible) {
        let tabs = _.cloneDeep(this.state.tabs);
        tabs[tabName].visible = visible;
        tabs[tabName].enabled = visible;
        if ( _.size(this.state.tabs) ) {
            this.setState({
                tabs: tabs
            });
        }

    }

    getTabContainer(tab, active_class) {
        let open_class = (active_class == 'active') ? 'open' : '';
        switch(tab.code) {
            case 'tm':
                return <SegmentTabMatches
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    id_segment = {this.props.sid}
                    segment = {this.props.segment}
                />;
                break;
            case 'cc':
                return <SegmentTabConcordance
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    id_segment = {this.props.sid}
                    segment = {this.props.segment}
                />;
                break;
            case 'gl':
                return <SegmentTabGlossary
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    id_segment = {this.props.sid}
                    segment = {this.props.segment}/>;
                break;
            case 'al':
                return <SegmentTabConflicts
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    segment = {this.props.segment}
                    id_segment = {this.props.sid}
                />;
                break;
            case 'notes':
                return <SegmentTabMessages
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    id_segment = {this.props.sid}
                    notes={this.props.segment.notes}
                    context_groups={this.props.segment.context_groups}
                    segmentSource = {this.props.segment.segment}
                    segment = {this.props.segment}
                />;
                break;
            case 'cl':
                return <SegmentFooterMultiMatches
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    id_segment = {this.props.sid}
                    segment = {this.props.segment}/>;
                break;
            case 'review':
                return <SegmentTabRevise
                    key={"container_" + tab.code}
                    code = {tab.code}
                    active_class = {open_class}
                    tab_class = {tab.tab_class}
                    id_segment = {this.props.sid}
                    translation={this.props.segment.translation}
                    segment={this.props.segment}
                    decodeTextFn={this.props.decodeTextFn}/>;
                break;
            default:
                return ''
        }
    }
    closeAllTabs() {
        let tabs = jQuery.extend(true, {}, this.state.tabs);
        for ( let item in tabs ) {
            tabs[item].open = false
        }
        this.setState({
            tabs: tabs
        });
    }
    // setDefaultTabOpen( sid, tabName) {
    //     let tabs = jQuery.extend(true, {}, this.state.tabs);
    //     if (tabs[tabName]) {
    //         //Close all tabs
    //         for ( let item in tabs ) {
    //             tabs[item].open = false
    //         }
    //         tabs[tabName].open = true;
    //     }
    // }
    openTab(sid, tabCode) {
        // Todo: refactoring, no jquery
        if (this.props.sid === sid ) {
            this.changeTab(tabCode, true);
        }
    }

    setHideMatchesCookie(hideMatches) {
        let cookieName = (config.isReview)? 'hideMatchesReview' : 'hideMatches';
        Cookies.set(cookieName + '-' + config.id_job, hideMatches, { expires: 3 });
    }

    getHideMatchesCookie() {
        let cookieName = (config.isReview)? 'hideMatchesReview' : 'hideMatches';
        if( !_.isUndefined(Cookies.get(cookieName + '-' + config.id_job))) {
            if (Cookies.get(cookieName + '-' + config.id_job) == "true") {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    tabClick(tabName, forceOpen) {
        this.changeTab(tabName, forceOpen);
        setTimeout(( ) =>{
            SegmentActions.setTabOpen(this.props.sid, tabName);
        });
    }

    changeTab(tabName, forceOpen) {
        if (event) {
            event.preventDefault();
        }
        forceOpen = forceOpen ? forceOpen : false;
        let tabs = jQuery.extend(true, {}, this.state.tabs);
        let tab = jQuery.extend(true, {}, tabs[tabName]);
        //Close all tabs
        for ( let item in tabs ) {
            tabs[item].open = false
        }
        let hideMatches = this.getHideMatchesCookie();
        if (tab.open && !forceOpen && !hideMatches) {
            tab.open = false;
            this.setHideMatchesCookie(true);
        } else {
            tab.open = true;
            tab.visible = true;
            this.setHideMatchesCookie(false);
        }
        tabs[tabName] = tab;

        this.setState({
            tabs: tabs
        });
    }
    componentDidMount() {
        SegmentStore.addListener(SegmentConstants.REGISTER_TAB, this.registerTab);
        SegmentStore.addListener(SegmentConstants.MODIFY_TAB_VISIBILITY, this.modifyTabVisibility);
        SegmentStore.addListener(SegmentConstants.OPEN_TAB, this.openTab);
        SegmentStore.addListener(SegmentConstants.ADD_TAB_INDEX, this.addTabIndex);
        SegmentStore.addListener(SegmentConstants.CLOSE_TABS, this.closeAllTabs);
        // SegmentStore.addListener(SegmentConstants.SET_DEFAULT_TAB, this.setDefaultTabOpen);
    }

    componentWillUnmount() {
        SegmentStore.removeListener(SegmentConstants.REGISTER_TAB, this.registerTab);
        SegmentStore.removeListener(SegmentConstants.MODIFY_TAB_VISIBILITY, this.modifyTabVisibility);
        SegmentStore.removeListener(SegmentConstants.OPEN_TAB, this.openTab);
        SegmentStore.removeListener(SegmentConstants.ADD_TAB_INDEX, this.addTabIndex);
        SegmentStore.removeListener(SegmentConstants.CLOSE_TABS, this.closeAllTabs);
        // SegmentStore.removeListener(SegmentConstants.SET_DEFAULT_TAB, this.setDefaultTabOpen);
    }

    allowHTML(string) {
        return { __html: string };
    }

    addTabIndex(sid, tab, index) {
        if (this.props.sid == sid) {
            let tabs = $.extend({}, {}, this.state.tabs);
            if (tabs[tab]) {
                tabs[tab].index = index;
                this.setState({
                    tabs: tabs
                })
            }
        }
    }

    isTabLoading(tab) {
        switch(tab.code) {
            case 'tm':
                return _.isUndefined(this.props.segment.contributions) ||
                    (_.isUndefined(this.props.segment.contributions.matches) &&
                    this.props.segment.contributions.errors.length === 0);
            case 'cl':
                return _.isUndefined(this.props.segment.cl_contributions) ||
                    (_.isUndefined(this.props.segment.cl_contributions.matches) &&
                    this.props.segment.cl_contributions.errors.length === 0);
            case 'gl':
                return _.isUndefined(this.props.segment.glossary);
            default:
                return false;
        }
    }

    getTabIndex(tab) {
        switch(tab.code) {
            case 'tm':
                return this.props.segment.contributions.matches.length;
            case 'cl':
                return this.props.segment.cl_contributions.matches.length;
            case 'gl':
                return Object.size(this.props.segment.glossary);
            default:
                return tab.index;
        }
    }

    render() {
        let labels = [];
        let containers = [];
        let self = this;
        let hideMatches = this.getHideMatchesCookie();
        for ( let key in this.state.tabs ) {
            let tab = this.state.tabs[key];
            if ( tab.enabled) {
                let hidden_class = (tab.visible) ? '' : 'hide';
                let active_class = (tab.open && !hideMatches) ? 'active' : '';
                let isLoading = this.isTabLoading(tab);
                let tabIndex = (!isLoading) ? this.getTabIndex(tab) : null;
                let loadingClass = (isLoading) ? "loading-tab" : "";
                let label = <li
                    key={ tab.code }
                    ref={(elem)=> this[tab.code] = elem}
                    className={ hidden_class + " " + active_class + " tab-switcher tab-switcher-" + tab.code + " " + loadingClass}
                    id={"segment-" + this.props.sid + tab.code}
                    data-tab-class={ tab.tab_class }
                    data-code={ tab.code }
                    onClick={ self.tabClick.bind(this, key, false) }>
                    {!isLoading ? (
                        <a tabIndex="-1" >{ tab.label }
                            <span className="number">{(tabIndex) ? ' (' + tabIndex + ')' : ''}</span>
                        </a>
                    ) : (
                        <a tabIndex="-1" >{ tab.label }
                            <span className="loader loader_on"/>
                        </a>
                    ) }

                </li>;
                labels.push(label);
                let container = self.getTabContainer(tab, active_class);
                containers.push(container);
            }
        }

        return (
            <div className="footer toggle"
                 ref={(ref) => this.footerRef = ref}>
                <ul className="submenu">
                    {labels}
                </ul>
                {containers}
                <div className="addtmx-tr white-tx">
                    <a className="open-popup-addtm-tr">Add private resources</a>
                </div>
            </div>
        )
    }
}

export default SegmentFooter;
