interface employeeApi {
  manualWorkPlaceAddition(
    req: ManualWorkPlaceAdditionRequest
  ): Promise<BaseResponse<ManualWorkPlaceAdditionResponse>>;
}

export default employeeApi;
