import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, notification, TablePaginationConfig } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CACHE_LOCATION_TIME, DEFAULT_PROVINCE } from '@/constant/const';

import { createCanSupport, getCans } from '../services/can-support';
import { getDistricts, GetDistrictsQueries } from '../services/district';
import {
  createNeedSupport,
  getNeeds,
  NeedSupportQueries,
  updateNeedStatus,
} from '../services/need-support';
import { getProvinces } from '../services/province';
import { createStaySupport, getStaySupport } from '../services/stay-support';
import { tags, TagType } from '../services/types';
import { getWards, GetWardsQueries } from '../services/ward';
import { createConnectGov, getConnectGov } from './../services/connect-gov';
import useDebounce from './useDebounce';

const useSupportYagi = () => {
  const [form] = Form.useForm();
  const province = useWatch('province', form) || DEFAULT_PROVINCE;
  const district = useWatch('district', form);
  const ward = useWatch('ward', form);
  const [activeTab, setActiveTab] = useState<TagType>(tags[2]);
  const queryClient = useQueryClient();

  const defaultQueries = {
    province: DEFAULT_PROVINCE,
    limit: 100,
    page: 1,
  };

  const [districtQueries, setDistrictQueries] = useState<GetDistrictsQueries>({
    province_code: DEFAULT_PROVINCE,
    limit: 200,
    page: 1,
  });
  const [wardQueries, setWardQueries] = useState<GetWardsQueries>({
    limit: 200,
    page: 1,
  });

  const [neeedQueries, setNeedQueries] =
    useState<NeedSupportQueries>(defaultQueries);

  const [canQueries, setCanQueries] =
    useState<NeedSupportQueries>(defaultQueries);

  const [stayQueries, setStayQueries] =
    useState<NeedSupportQueries>(defaultQueries);

  const [govQueries, setGovQueries] =
    useState<NeedSupportQueries>(defaultQueries);

  const getWardQueries = useDebounce(wardQueries, 300);
  const getDistrictQueries = useDebounce(districtQueries, 300);
  const getNeedQueries = useDebounce(neeedQueries, 300);
  const getCansQueries = useDebounce(canQueries, 300);
  const getStaySupportQueries = useDebounce(stayQueries, 300);
  const getConnectGovQueris = useDebounce(govQueries, 300);

  useEffect(() => {
    if (province) {
      setDistrictQueries((pre) => ({ ...pre, province_code: province }));
      setWardQueries((pre) => ({ ...pre, province_code: province }));
    }

    if (district) {
      setWardQueries((pre) => ({ ...pre, district_code: district }));
    }
  }, [province, district]);

  const handleTabSwitch = (tab: TagType) => {
    setActiveTab(tab);
  };

  const { data: provinceData } = useQuery({
    queryKey: ['provinces'],
    queryFn: () =>
      getProvinces({
        limit: 100,
      }),
    staleTime: CACHE_LOCATION_TIME,
  });

  const provinces = useMemo(() => {
    if (!provinceData) return [];
    return provinceData.results;
  }, [provinceData]);

  const { data: districtData } = useQuery({
    queryKey: ['districts', getDistrictQueries, province],
    queryFn: () => getDistricts(getDistrictQueries),
    enabled: !!province || !!getDistrictQueries.province_code,
  });

  const districts = useMemo(() => {
    if (!districtData) return [];
    return districtData.results;
  }, [districtData]);

  const { data: wardData } = useQuery({
    queryKey: ['wards', getWardQueries],
    queryFn: () => getWards(getWardQueries),
    enabled:
      !!getWardQueries.district_code ||
      !!getWardQueries.province_code ||
      !!district,
    staleTime: CACHE_LOCATION_TIME,
  });

  const wards = useMemo(() => {
    if (!wardData) return [];
    return wardData.results;
  }, [wardData]);

  const handleProvinceChange = useCallback((value: string) => {
    setDistrictQueries((pre) => ({ ...pre, province_code: value }));
    switch (activeTab.key) {
      case 'list-need-support':
        setNeedQueries((pre) => ({ ...pre, province: value }));
        break;
      case 'list-support-teams':
        setCanQueries((pre) => ({ ...pre, province: value }));
        break;
      case 'list-accommodations':
        setStayQueries((pre) => ({ ...pre, province: value }));
        break;
      case 'connect-authorities':
        setGovQueries((pre) => ({ ...pre, province: value }));
        break;
      default:
        break;
    }
  }, []);

  const handleDistrictChange = useCallback((value: string) => {
    setWardQueries((pre) => ({ ...pre, district_code: value }));
    switch (activeTab.key) {
      case 'list-need-support':
        setNeedQueries((pre) => ({ ...pre, district: value }));
        break;
      case 'list-support-teams':
        setCanQueries((pre) => ({ ...pre, district: value }));
        break;
      case 'list-accommodations':
        setStayQueries((pre) => ({ ...pre, district: value }));
        break;
      case 'connect-authorities':
        setGovQueries((pre) => ({ ...pre, district: value }));
        break;
      default:
        break;
    }
  }, []);
  const handleWardChange = useCallback((value: string) => {
    switch (activeTab.key) {
      case 'list-need-support':
        setNeedQueries((pre) => ({ ...pre, ward: value }));
        break;
      case 'list-support-teams':
        setCanQueries((pre) => ({ ...pre, ward: value }));
        break;
      case 'list-accommodations':
        setStayQueries((pre) => ({ ...pre, ward: value }));
        break;
      case 'connect-authorities':
        setGovQueries((pre) => ({ ...pre, ward: value }));
        break;
      default:
        break;
    }
  }, []);

  const { data: needData } = useQuery({
    queryKey: ['getNeedQueries', getNeedQueries],
    queryFn: () => getNeeds(getNeedQueries),
    enabled: activeTab.key === 'list-need-support',
  });

  const { data: canData } = useQuery({
    queryKey: ['getCansQueries', getCansQueries],
    queryFn: () => getCans(getCansQueries),
    enabled: activeTab.key === 'list-support-teams',
  });

  const { data: stayData } = useQuery({
    queryKey: ['getStaySupportQueries', getStaySupportQueries],
    queryFn: () => getStaySupport(getStaySupportQueries),
    enabled: activeTab.key === 'list-accommodations',
  });

  const { data: govData } = useQuery({
    queryKey: ['getConnectGovQueris', getConnectGovQueris],
    queryFn: () => getConnectGov(getConnectGovQueris),
    enabled: activeTab.key === 'connect-authorities',
  });

  const needs = useMemo(() => {
    if (!needData) return [];
    return needData.results;
  }, [needData]);

  const paginationNeed: TablePaginationConfig = useMemo(() => {
    return {};
  }, [needData]);

  const cans = useMemo(() => {
    if (!canData) return [];
    return canData.results;
  }, [canData]);

  const paginationCan: TablePaginationConfig = useMemo(() => {
    if (activeTab.key === 'list-support-teams') {
      const totalCount = canData?.totalResults;
      return {
        total: totalCount,
        current: canQueries.page,
        pageSize: 10,
        onChange: (page) => {
          setCanQueries((pre) => ({ ...pre, page }));
        },
        showSizeChanger: false,
        size: 'small',
      };
    }
    return {};
  }, [canData, canQueries, setCanQueries, activeTab.key]);

  const stays = useMemo(() => {
    if (!stayData) return [];
    return stayData.results;
  }, [stayData]);

  const paginationStay: TablePaginationConfig = useMemo(() => {
    if (activeTab.key === 'list-accommodations') {
      const totalCount = stayData?.totalResults;
      return {
        total: totalCount,
        current: stayQueries.page,
        onChange: (page) => {
          setStayQueries((pre) => ({ ...pre, page }));
        },
        pageSize: 10,
        showSizeChanger: false,
        size: 'small',
      };
    }
    return {};
  }, [stayData, stayQueries, setStayQueries, activeTab.key]);

  const govs = useMemo(() => {
    if (!govData) return [];
    return govData.results;
  }, [govData]);

  const paginationGov: TablePaginationConfig = useMemo(() => {
    if (activeTab.key === 'connect-authorities') {
      const totalCount = govData?.totalResults;
      return {
        total: totalCount,
        current: govQueries.page,
        onChange: (page) => {
          setGovQueries((pre) => ({ ...pre, page }));
        },
        pageSize: 10,
        showSizeChanger: false,
        size: 'small',
      };
    }
    return {};
  }, [govData, govQueries, setGovQueries]);

  const { mutate: createNeedMutate } = useMutation({
    mutationFn: createNeedSupport,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Tạo yêu cầu hỗ trợ thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getNeedQueries', getNeedQueries],
      });
    },
  });

  const { mutate: createCanMutate } = useMutation({
    mutationFn: createCanSupport,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Thêm đoàn hỗ trợ thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getCansQueries', getCansQueries],
      });
    },
  });

  const { mutate: createStaySupportMutate } = useMutation({
    mutationFn: createStaySupport,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Thêm chỗ ăn nghỉ thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getStaySupportQueries', getStaySupportQueries],
      });
    },
  });

  const { mutate: createConnectGovMutate } = useMutation({
    mutationFn: createConnectGov,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Thêm thông tin kết nối chính quyền thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getConnectGovQueris', getConnectGovQueris],
      });
    },
  });

  const { mutate: updateNeedStatusMutate } = useMutation({
    mutationFn: updateNeedStatus,
    onSuccess: () => {
      notification.success({
        placement: 'top',
        message: 'Cập nhật trạng thái thành công',
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['getNeedQueries', getNeedQueries],
      });
    },
  });

  const onSubmit = useCallback(
    (values: any) => {
      switch (activeTab.key) {
        case 'add-support-info':
          createNeedMutate(values);
          break;
        case 'add-support-teams-info':
          createCanMutate(values);
          break;
        case 'add-accommodations-info':
          createStaySupportMutate(values);
          break;
        case 'add-connect-authorities':
          createConnectGovMutate(values);
          break;
        default:
          break;
      }
    },
    [
      activeTab.key,
      createNeedMutate,
      createCanMutate,
      createStaySupportMutate,
      createConnectGovMutate,
    ],
  );

  const handleUpdateNeedStatus = useCallback(
    (id: string, status: boolean) => {
      updateNeedStatusMutate({ id, status });
    },
    [updateNeedStatusMutate],
  );

  return {
    provinces,
    districts,
    wards,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
    handleTabSwitch,
    onSubmit,
    handleUpdateNeedStatus,
    activeTab,
    form,
    needs,
    cans,
    stays,
    govs,
    paginationCan,
    paginationNeed,
    paginationStay,
    paginationGov,
  };
};

export default useSupportYagi;
