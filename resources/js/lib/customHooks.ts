/**
 * THESE METHODS CAN ONLY BE CALLED INSIDE OF THE BODY OF A REACT FUNCTIONAL COMPONENT
 */

import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { AnyObject } from '@/types/common';

export const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

type Destructor = () => void;

export const useDidUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const didMountRef = useRef(false);

  useEffect((): void | Destructor => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      return effect();
    }
  }, deps);
};

type AsyncUseEffectActions<Data> = {
  predicate?: () => boolean;
  run: () => Promise<Data>;
  onSuccess?: (data: Data) => void;
  onError?: (error: any) => void;
  onFinally?: VoidFunction;
  onUnmount?: VoidFunction;
};

export const asyncUseEffect = <Data>(actions: AsyncUseEffectActions<Data>, deps?: DependencyList): void => {
  const { predicate, run, onSuccess, onError, onFinally, onUnmount } = actions;
  let mounted = true;

  useEffect((): VoidFunction => {
    let continueRun = true;
    if (predicate && mounted) {
      continueRun = predicate();
    }

    const runAsyncEffect = async () => {
      try {
        const data = await run();
        if (onSuccess && mounted) {
          onSuccess(data);
        }
      } catch (error) {
        if (onError && mounted) {
          onError(error);
        }
      } finally {
        if (onFinally && mounted) {
          onFinally();
        }
      }
    };

    if (continueRun) {
      runAsyncEffect();
    }

    return (): void => {
      mounted = false;
      if (onUnmount) {
        onUnmount();
      }
    };
  }, deps);
};

type MatchObject = {
  path: string;
  url: string;
  isExact: boolean;
  params: AnyObject;
};

export const useMatch = (): MatchObject => useRouteMatch();
