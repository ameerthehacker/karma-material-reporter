import { SuiteInfoComponent } from './suite-info.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('SuiteInfoComponent', () => {
  let suiteInfoComponent: SuiteInfoComponent;

  beforeEach(() => {
    suiteInfoComponent = new SuiteInfoComponent();
  });

  describe('init()', () => {
    beforeEach(() => {
      suiteInfoComponent.suiteInfo = {
        'example suite1': {},
        _: {},
        $: {},
        'example suite 2': {}
      };
    });

    it('should filter out _ and $ keys from suite', () => {
      suiteInfoComponent.init();

      expect(suiteInfoComponent.suites).toEqual([
        'example suite1',
        'example suite 2'
      ]);
    });
  });

  describe('ngOnInit()', () => {
    it('should call init()', () => {
      spyOn(suiteInfoComponent, 'init');

      suiteInfoComponent.ngOnInit();

      expect(suiteInfoComponent.init).toHaveBeenCalled();
    });
  });

  describe('isPending()', () => {
    it('should return true when typeof(test) is !== object', () => {
      expect(suiteInfoComponent.isPending('something')).toBeTruthy();
    });

    it('should return false when typeof(test) is === object', () => {
      expect(suiteInfoComponent.isPending({})).toBeFalsy();
    });
  });

  describe('hasMoreSuites()', () => {
    it('should return false when there is no more suite to process', () => {
      const suite = {
        _: [],
        $: {}
      };

      expect(suiteInfoComponent.hasMoreSuites(suite)).toBeFalsy();

      const suiteWithoutInfo = {
        _: []
      };

      expect(suiteInfoComponent.hasMoreSuites(suiteWithoutInfo)).toBeFalsy();

      const suiteWithoutSpecs = {
        $: {}
      };

      expect(suiteInfoComponent.hasMoreSuites(suiteWithoutSpecs)).toBeFalsy();
    });

    it('should return true when there is more suites to process', () => {
      const suite = {
        _: [],
        $: {},
        'some suite': {}
      };

      expect(suiteInfoComponent.hasMoreSuites(suite)).toBeTruthy();
    });

    describe('ngOnChanges()', () => {
      it('should not call init() when there is no change', () => {
        const change = new SimpleChange(0, 1, false);
        const changes: SimpleChanges = {
          someChange: change
        };
        spyOn(suiteInfoComponent, 'init');

        suiteInfoComponent.ngOnChanges(changes);

        expect(suiteInfoComponent.init).toHaveBeenCalledTimes(0);
      });

      it('should call init() when there is change and suiteInfo !== undefined', () => {
        suiteInfoComponent.suiteInfo = { specs: { _: [] } };
        const change = new SimpleChange(
          { specs: {} },
          suiteInfoComponent.suiteInfo,
          false
        );
        const changes: SimpleChanges = {
          suiteInfo: change
        };
        spyOn(suiteInfoComponent, 'init');

        suiteInfoComponent.ngOnChanges(changes);

        expect(suiteInfoComponent.init).toHaveBeenCalled();
      });

      it('should not call init() when there is change and suiteInfo === undefined', () => {
        suiteInfoComponent.suiteInfo = undefined;
        const change = new SimpleChange(
          { specs: {} },
          suiteInfoComponent.suiteInfo,
          false
        );
        const changes: SimpleChanges = {
          suiteInfo: change
        };
        spyOn(suiteInfoComponent, 'init');

        suiteInfoComponent.ngOnChanges(changes);

        expect(suiteInfoComponent.init).toHaveBeenCalledTimes(0);
      });
    });
  });
});
