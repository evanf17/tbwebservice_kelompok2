
<!--   Kitchen Sink -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            {{ action }} {{ pagetitle }}
                        </div>
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead ng-class="'{{ breadcrumbcolor }}'">
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Member<a href="" ng-click="sort_by('member_nama');"></a></th>
                                            <th>Alamat <a href="" ng-click="sort_by('member_alamat');"></a></th>
                                            <th>No. Telpon <a href="" ng-click="sort_by('member_telp');"></a></th>
                                            <th>Tanggal Masuk Member <a href="" ng-click="sort_by('member_tgl_masuk');"></a></th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <div ng-repeat="no in no(1) track by $index">
                                        <tr>
                                            <td>{{ $index+1 }}</td>
                                            <td>{{ data.member_nama }}</td>
                                            <td>{{ data.member_alamat }}</td>
                                            <td>{{ data.member_telp }}</td>
                                            <td>{{ data.member_tgl_masuk }}</td>
                                            <td>
											<button class="btn btn-primary"><i class="fa fa-edit "></i> </button>
											<button class="btn btn-danger"><i class="fa fa-pencil"></i> </button></td>
                                        </div>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                     <!-- End  Kitchen Sink -->